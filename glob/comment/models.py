from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import render, get_object_or_404, redirect
from wagtail.core.models import Page, Orderable, PageManager, PageQuerySet
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel
from wagtailtrans.models import TranslatablePage, Page

class CustomQuerySet(PageQuerySet):
    pass
class CommentManager(PageManager):
    # def get_queryset(self):
    #     return CustomQuerySet(self.model, using=self._db)
    def filter_by_instance(self, object_id, content_type):
        content_type = ContentType.objects.get_for_model(content_type)
        
        return self.get_queryset().filter(object_id=object_id, content_type=content_type)

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default = 1, on_delete=models.PROTECT)
    # translatable_comment = models.ForeignKey(TranslatablePage, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id') 
    path = models.TextField(verbose_name=('URL path'), blank=True, editable=False)
    # instead of linking to a post only, we'll be using a generic foreign key to allow us to add a comment to any new app installed
    
    objects = CommentManager()
    content_panels = Page.content_panels + [
        FieldPanel('content', classname="full"),
    ]
    def __str__(self):
        return f'A comment by: {self.user} in path: {self.page_name(self.object_id)}'

    def page_name(self, id):
        return TranslatablePage.objects.get(translatable_page_ptr_id=id).url_path   

    class Meta:
        ordering = ['timestamp']