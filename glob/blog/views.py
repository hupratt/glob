from rest_framework import viewsets
import re

from wagtailtrans.models import Language, TranslatablePage
from wagtail.core.models import Site

from .models import BlogPage, BlogCategory, BlogPageTag, Tag
from .serializers import PostPageSerializer, CategorySerializer, TagSerializer
from rest_framework import mixins
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.utils.translation import get_language


def acronym_to_id(argument):
    switcher = {"en": 1, "de": 2, "fr": 3, "pt": 4}
    return switcher.get(argument, 1)


class PostListView(ListAPIView):
    serializer_class = PostPageSerializer
    queryset = BlogPage.objects.live()
    permission_classes = (AllowAny,)
    paginate_by_param = "limit"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        # Same as doing queryset = BlogPage.objects.all().filter(live=True)
        queryset = BlogPage.objects.all().filter(live=True)
        lang = self.request.headers.get("django_language", get_language())
        queryset = queryset.filter(language=acronym_to_id(lang))

        category = self.request.query_params.get("category", None)
        tag = self.request.query_params.get("tag", None)
        if category is not None and category != "*" and category != "":
            queryset = queryset.filter(categories__slug=category)
        if tag is not None and tag != "*" and tag != "":
            queryset = queryset.filter(tags__slug=tag)
        return queryset


class TagListView(ListAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = (AllowAny,)


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = BlogCategory.objects.all()
    permission_classes = (AllowAny,)
