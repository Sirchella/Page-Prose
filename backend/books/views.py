from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # Public: GET (browse/detail). Authenticated admin only: POST/PUT/PATCH/DELETE
    permission_classes = [IsAuthenticatedOrReadOnly]