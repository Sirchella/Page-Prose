from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order
from .emails import send_order_confirmation, send_status_update


@receiver(post_save, sender=Order)
def order_post_save(sender, instance, created, **kwargs):
    if created:
        send_order_confirmation(instance)
    elif instance.status in ('shipped', 'delivered'):
        send_status_update(instance)
