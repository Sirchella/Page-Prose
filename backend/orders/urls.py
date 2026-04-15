from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, SendTestEmailView

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('send-test-email/', SendTestEmailView.as_view(), name='send_test_email'),
]