from rest_framework import serializers
from .models import Order, OrderItem, DiscountCode


class OrderItemSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_author = serializers.CharField(source='book.author', read_only=True)
    book_cover = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = '__all__'

    def get_book_cover(self, obj):
        if obj.book.cover_image:
            try:
                return obj.book.cover_image.url
            except Exception:
                return ''
        return ''


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['book', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class OrderCreateSerializer(serializers.ModelSerializer):
    """Used for POST /api/orders/ — writes items in the same request."""
    items = OrderItemCreateSerializer(many=True, write_only=False)

    class Meta:
        model = Order
        fields = ['customer_name', 'customer_email', 'shipping_address', 'total_price', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order

    def to_representation(self, instance):
        # Return full representation (including id, status, created_at) after create
        return OrderSerializer(instance).data


class DiscountCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = '__all__'
        read_only_fields = ['uses', 'created_at']
