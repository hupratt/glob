from .models import BlogPage
from modeltranslation.translator import TranslationOptions
from modeltranslation.decorators import register
from wagtail.core.models import Page

# @register(BlogPage)
# class TransBlogPage(TranslationOptions):
#     fields = (
#         'body',
#         'introduction',
#         'subtitle',
#     )