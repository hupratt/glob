from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls

# from .api import api_router
# from .api import blog_router
from .views import PostListView


urlpatterns = [path("", PostListView.as_view(), name="post-list")]
