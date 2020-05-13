from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

# from .api import api_router
from .api import blog_router


urlpatterns = [
    # re_path(r"^api/cms/", api_router.urls),
    re_path(r"^api/blog/", include(blog_router.urls)),
    # re_path(r"^django-admin/", admin.site.urls),
    # re_path(r"^admin/", include(wagtailadmin_urls)),
    re_path(r"^documents/", include(wagtaildocs_urls)),
    # re_path(
    #     r"^posts/$",
    #     TemplateView.as_view(template_name="frontend/index.html"),
    #     name="posts",
    # ),
    # This is tricky, Wagtail admin can not work if we remove the last line
    # re_path(r"", include(wagtail_urls)),
]
