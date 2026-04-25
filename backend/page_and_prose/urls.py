from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.static import serve
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from orders.views import InitiatePaymentView, PaymentStatusView, SendTestEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),
    path('api/', include('orders.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/initiate-payment/', InitiatePaymentView.as_view(), name='initiate_payment'),
    path('api/payment-status/<str:reference>/', PaymentStatusView.as_view(), name='payment_status'),
    path('api/send-test-email/', SendTestEmailView.as_view(), name='send_test_email'),
    # Serve media files in all environments (DEBUG and production)
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]
