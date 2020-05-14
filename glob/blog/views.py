from rest_framework import viewsets

from .models import BlogPage, BlogCategory, BlogPageTag, Tag
from .serializers import PostPageSerializer, CategorySerializer, TagSerializer
from rest_framework import mixins
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class PostListView(ListAPIView):
    serializer_class = PostPageSerializer
    queryset = BlogPage.objects.all()
    permission_classes = (AllowAny,)
    paginate_by_param = "limit"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        return BlogPage.objects.all()


class TagListView(ListAPIView):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = (AllowAny,)


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = BlogCategory.objects.all()
    permission_classes = (AllowAny,)