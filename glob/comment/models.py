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

# class CustomQuerySet(PageQuerySet):
#     def get_comments(self):
#         return Comment.objects.all(object_id=self.translatable_page_ptr_id)    

class CommentManager(PageManager):
    # def get_queryset(self):
    #     return CustomQuerySet(self.model, using=self._db)
    def filter_by_instance(self, object_id):
        content_type = ContentType.objects.get_for_model(TranslatablePage)
        return self.get_queryset().filter(comment_object_id=object_id, comment_content_type=content_type)

class Comment(Page):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default = 1, on_delete=models.PROTECT)
    # translatable_comment = models.ForeignKey(TranslatablePage, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    comment_content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT, null=True)
    comment_object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('comment_content_type', 'comment_object_id') 
    # instead of linking to a post only, we'll be using a generic foreign key to allow us to add a comment to any new app installed
    
    objects = CommentManager()
    content_panels = Page.content_panels + [
        FieldPanel('content', classname="full"),
    ]
    def __str__(self):
        return f'A comment by: {self.object_id}'
    class Meta:
        ordering = ['timestamp']