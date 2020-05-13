from rest_framework import viewsets

from .models import BlogPage
from .serializers import PostPageSerializer


class PostPageSet(viewsets.ModelViewSet):
    serializer_class = PostPageSerializer
    queryset = BlogPage.objects.all()
    http_method_names = ["get"]

    def get_queryset(self):
        queryset = BlogPage.objects.all()
        import pdb

        pdb.set_trace()
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
