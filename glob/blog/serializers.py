from rest_framework import serializers
from .models import BlogPage, BlogCategory, BlogPageTag, Tag
from rest_framework.fields import Field
from wagtail.core.templatetags.wagtailcore_tags import richtext


class PostPageSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    parent_page = serializers.SerializerMethodField()
    body = serializers.SerializerMethodField()

    class Meta:
        model = BlogPage
        fields = (
            "id",
            "slug",
            "title",
            "get_image",
            "parent_page",
            "body",
            "introduction",
            "authors",
        )

    def get_authors(self, obj):
        return [f"{author.first_name} {author.last_name}" for author in obj.authors()]

    def get_parent_page(self, obj):
        return obj.get_parent().slug

    def get_body(self, obj):
        return obj.body.__html__()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ("id", "slug", "name")


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "slug", "name")
