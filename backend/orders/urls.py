from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, DiscountCodeViewSet, ValidateDiscountView

router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'discounts', DiscountCodeViewSet)

urlpatterns = [
    # validate must come before the router include so 'validate' isn't treated as a pk
    path('discounts/validate/', ValidateDiscountView.as_view(), name='validate_discount'),
    path('', include(router.urls)),
]