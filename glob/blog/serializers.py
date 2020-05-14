from rest_framework import serializers

from .models import BlogPage


class PostPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPage
        fields = ("id", "slug", "title", "image")


# class CategorySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = BlogCategory
#         fields = ('id',
#                   'slug',
#                   'name',
#                   )


# class TagSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Tag
#         fields = ('id',
#                   'slug',
#                   'name',
#                   )
