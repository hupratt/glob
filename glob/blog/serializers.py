from rest_framework import serializers
from .models import BlogPage, BlogCategory, BlogPageTag, Tag
from rest_framework.fields import Field


class PostPageSerializer(serializers.ModelSerializer):
    string_tags = serializers.SerializerMethodField()
    parent_page = serializers.SerializerMethodField()
    class Meta:
        model = BlogPage
        fields = ("id", "slug", "title", "get_image", 'string_tags', 'parent_page')

    def get_string_tags(self, obj):
        return [tag.name for tag in obj.get_tags]

    def get_parent_page(self, obj):
        return obj.get_parent().slug

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ('id',
                  'slug',
                  'name',
                  )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id',
                'slug',

                  'name',
                  )