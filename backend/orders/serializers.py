from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        # `items` is read_only so it won't appear in validated_data;
        # read directly from the raw input instead.
        items_data = self.initial_data.get('items', [])
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                book_id=item['book'],
                quantity=item['quantity'],
                price=item['price'],
            )
        return order