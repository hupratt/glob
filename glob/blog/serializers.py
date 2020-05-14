from rest_framework import serializers
from .models import BlogPage
from rest_framework.fields import Field


class PostPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPage
        fields = ("id", "slug", "title", "get_image")
