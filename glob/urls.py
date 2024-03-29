from django.conf.urls import include, url
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

urlpatterns = [
    url(r"^$", page_redirect, name="index"),
    # url(r"^$", page_redirect, name="index"),
    url(r"^django-admin/", admin.site.urls),
    url(r"^admin/", include(wagtailadmin_urls)),
    url(r"^documents/", include(wagtaildocs_urls)),
    url(r"^search/$", search_views.search, name="search"),
    url(r"^sitemap\.xml$", sitemap),
    url(r"^api/v2/", api_router.urls),
    url(r"^addcomment/$", add_comment, name="add-comment"),
    url(
        r"^addcommentofcomment/$", add_comment_of_comment, name="add-comment-of-comment"
    ),
    path("api-auth/", include("rest_framework.urls")),
    path("api/blog/", include(blog_urls)),
    path("accounts/", include("allauth.urls")),
]


if settings.DEBUG:
    # Add views for testing 404 and 500 templates
    urlpatterns += [
        url(r"^test404/$", TemplateView.as_view(template_name="404.html")),
        url(r"^test500/$", TemplateView.as_view(template_name="500.html")),
    ]

# urlpatterns += i18n_patterns(
#     # url(r"^$", page_redirect, name="index"),
#     # path("", page_redirect, name="index"),
#     # path("", include(wagtail_urls)),
#     prefix_default_language=False,
# )
