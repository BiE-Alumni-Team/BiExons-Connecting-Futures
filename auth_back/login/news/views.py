from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import News
from .serializers import NewsSerializer


class NewsListView(generics.ListAPIView):
    queryset = News.objects.all().order_by('-date')
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]


class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'