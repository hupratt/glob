from rest_framework import serializers
from .models import BlogPage, BlogCategory, BlogPageTag, Tag
from rest_framework.fields import Field
from wagtail.core.templatetags.wagtailcore_tags import richtext
from wagtail.images.api.fields import ImageRenditionField


class PostPageTagsSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = BlogPage
        fields = ("id", "tags")

    def get_tags(self, obj):
        return [{"name": tag.name, "slug": tag.slug} for tag in obj.tags.all()]


class PostPageSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    parent_page = serializers.SerializerMethodField()
    body = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    times_commented = serializers.SerializerMethodField()

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
            "tags",
            "comments",
            "times_commented",
        )

    def get_times_commented(self, obj):
        return obj.comments.count()

    def get_comments(self, obj):
        # if obj.id == 9:
        #     import pdb

        #     pdb.set_trace()
        return [
            {
                "content": comment.content,
                "timestamp": comment.timestamp,
                "content_type": comment.content_type.name,
                "user_fullname": f"{comment.user.first_name} {comment.user.last_name}",
                # thumbnail lives at comment.user.thumb_image but need to parse it first
                "user_image": comment.user.image.file.url,
            }
            for comment in obj.comments
        ]

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_authors(self, obj):
        return [
            {
                "name": f"{author.first_name} {author.last_name}",
                "image": f"{author.image.file.url}",
                "published_date": obj.date_published,
                "thumb_image": author.image.get_rendition("fill-50x50").url,
            }
            for author in obj.authors()
        ]

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
