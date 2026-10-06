from rest_framework import serializers
from .models import News


class NewsSerializer(serializers.ModelSerializer):
    readTime = serializers.CharField(source='read_time')

    class Meta:
        model = News
        fields = [
            'id', 'slug', 'title', 'category', 'date', 'readTime',
            'featured', 'image', 'description', 'content',
        ]