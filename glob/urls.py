from django.urls import include, re_path
from django.conf import settings
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.contrib.sitemaps.views import sitemap
from wagtail.core import urls as wagtail_urls
from django.conf.urls.i18n import i18n_patterns
from glob.search import views as search_views
from .api import api_router
from .views import add_comment, add_comment_of_comment, page_redirect
from django.urls import include, path
from glob.blog import urls as blog_urls
from django.views.generic import TemplateView
from django.conf.urls.static import static

urlpatterns = [
    re_path(r"^$", page_redirect, name="index"),
    re_path(r"^django-admin/", admin.site.urls),
    re_path(r"^admin/", include(wagtailadmin_urls)),
    re_path(r"^documents/", include(wagtaildocs_urls)),
    re_path(r"^search/$", search_views.search, name="search"),
    re_path(r"^sitemap\.xml$", sitemap),
    re_path(r"^api/v2/", api_router.urls),
    re_path(r"^addcomment/$", add_comment, name="add-comment"),
    re_path(
        r"^addcommentofcomment/$", add_comment_of_comment, name="add-comment-of-comment"
    ),
    path("api-auth/", include("rest_framework.urls")),
    path("api/blog/", include(blog_urls)),
    path("accounts/", include("allauth.urls")),
]


if settings.DEBUG:
    # Add views for testing 404 and 500 templates
    urlpatterns += [
        re_path(r"^test404/$", TemplateView.as_view(template_name="404.html")),
        re_path(r"^test500/$", TemplateView.as_view(template_name="500.html")),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += i18n_patterns(
#     # url(r"^$", page_redirect, name="index"),
#     # path("", page_redirect, name="index"),
#     # path("", include(wagtail_urls)),
#     prefix_default_language=False,
# )
