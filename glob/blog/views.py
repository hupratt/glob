from rest_framework import viewsets

from .models import BlogPage
from .serializers import PostPageSerializer
from rest_framework import mixins
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class PostPageSet(ListAPIView):
    serializer_class = PostPageSerializer
    queryset = BlogPage.objects.all()
    permission_classes = (AllowAny,)
    paginate_by_param = "limit"

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = BlogPage.objects.all()
        # category = self.request.query_params.get("category", None)
        # tag = self.request.query_params.get("tag", None)
        # if category is not None and category != "*":
        #     queryset = queryset.filter(categories__slug=category)
        # if tag is not None and tag != "*":
        #     queryset = queryset.filter(tags__slug=tag)
        return queryset


# class CategorySet(viewsets.ModelViewSet):
#     queryset = BlogCategory.objects.all()
#     serializer_class = CategorySerializer
#     http_method_names = ['get']


# class TagSet(viewsets.ModelViewSet):
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer
#     http_method_names = ['get']
