from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import render, get_object_or_404, redirect
from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default = 1, on_delete=models.CASCADE)
    # post = models.ForeignKey(BlogPage, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id') 
    # instead of linking to a post only, we'll be using a generic foreign key to allow us to add a comment to any new app installed
    content_panels = Page.content_panels + [
        FieldPanel('content', classname="full"),
    ]
    def __str__(self):
        return f'A comment by: {self.user.username}'
    class Meta:
        ordering = ['timestamp']