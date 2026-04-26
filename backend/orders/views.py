import uuid
import requests
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Order, DiscountCode
from .serializers import OrderSerializer, OrderCreateSerializer, DiscountCodeSerializer
from .emails import send_test_email


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        # Customers can place orders without logging in.
        # Everything else (list, retrieve, update, delete) requires admin auth.
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer


def _campay_token():
    """Get a short-lived Campay auth token."""
    res = requests.post(
        f"{settings.CAMPAY_BASE_URL}token/",
        json={
            'username': settings.CAMPAY_APP_USERNAME,
            'password': settings.CAMPAY_APP_PASSWORD,
        },
        timeout=10,
    )
    res.raise_for_status()
    return res.json()['token']


class InitiatePaymentView(APIView):
    """POST /api/initiate-payment/  — starts a Mobile Money collect request."""

    def post(self, request):
        if not settings.CAMPAY_APP_USERNAME:
            return Response(
                {'error': 'Campay is not configured. Add CAMPAY_APP_USERNAME and CAMPAY_APP_PASSWORD to .env.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        phone = request.data.get('phone', '').strip()
        amount = request.data.get('amount')
        description = request.data.get('description', 'Page & Prose order')

        if not phone or not amount:
            return Response({'error': 'phone and amount are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = _campay_token()
            # Demo system caps at 25 XAF — use real amount in production
            is_demo = 'demo.campay.net' in settings.CAMPAY_BASE_URL
            send_amount = min(int(amount), 25) if is_demo else int(amount)

            res = requests.post(
                f"{settings.CAMPAY_BASE_URL}collect/",
                json={
                    'amount': str(send_amount),
                    'from': phone,
                    'description': description,
                    'external_reference': str(uuid.uuid4()),
                },
                headers={'Authorization': f'Token {token}'},
                timeout=15,
            )
            if not res.ok:
                return Response({'error': res.text}, status=status.HTTP_400_BAD_REQUEST)
            return Response(res.json())
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)


class PaymentStatusView(APIView):
    """GET /api/payment-status/<reference>/  — checks a transaction."""

    def get(self, request, reference):
        try:
            token = _campay_token()
            res = requests.get(
                f"{settings.CAMPAY_BASE_URL}transaction/{reference}/",
                headers={'Authorization': f'Token {token}'},
                timeout=10,
            )
            res.raise_for_status()
            return Response(res.json())
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_502_BAD_GATEWAY)


class SendTestEmailView(APIView):
    """POST /api/send-test-email/  — sends a test email (admin only)."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        to = request.data.get('to', '').strip()
        if not to:
            return Response({'error': 'to is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not settings.RESEND_API_KEY:
            return Response(
                {'error': 'RESEND_API_KEY is not configured. Add it to your Railway environment variables.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        send_test_email(to)
        return Response({'ok': True})


class DiscountCodeViewSet(viewsets.ModelViewSet):
    """CRUD for discount codes — admin only."""
    queryset = DiscountCode.objects.all().order_by('-created_at')
    serializer_class = DiscountCodeSerializer
    permission_classes = [IsAuthenticated]


class ValidateDiscountView(APIView):
    """POST /api/discounts/validate/ — public; validates a code against a subtotal."""
    permission_classes = [AllowAny]

    def post(self, request):
        from decimal import Decimal, InvalidOperation
        from datetime import date

        code = request.data.get('code', '').strip().upper()
        try:
            subtotal = Decimal(str(request.data.get('subtotal', 0)))
        except InvalidOperation:
            return Response({'error': 'Invalid subtotal'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            discount = DiscountCode.objects.get(code=code, active=True)
        except DiscountCode.DoesNotExist:
            return Response({'error': 'Invalid discount code'}, status=status.HTTP_400_BAD_REQUEST)

        if discount.expiry_date and discount.expiry_date < date.today():
            return Response({'error': 'This code has expired'}, status=status.HTTP_400_BAD_REQUEST)

        if discount.max_uses is not None and discount.uses >= discount.max_uses:
            return Response({'error': 'This code has reached its maximum uses'}, status=status.HTTP_400_BAD_REQUEST)

        if subtotal < discount.min_purchase:
            return Response(
                {'error': f'Minimum purchase of {int(discount.min_purchase):,} XAF required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if discount.type == 'percentage':
            amount = subtotal * (discount.value / Decimal('100'))
        else:
            amount = min(discount.value, subtotal)

        return Response({
            'code': discount.code,
            'type': discount.type,
            'value': str(discount.value),
            'amount': str(amount.quantize(Decimal('0.01'))),
        })
