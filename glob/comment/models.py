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
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from modelcluster.fields import ParentalKey


class CustomQuerySet(PageQuerySet):
    pass


class CommentManager(PageManager):
    # def get_queryset(self):
    #     return CustomQuerySet(self.model, using=self._db)
    def filter_by_instance(self, object_id, content_type):
        content_type = ContentType.objects.get_for_model(content_type)
        return self.get_queryset().filter(
            object_id=object_id, content_type=content_type
        )


class Comment(models.Model):
    user = models.ForeignKey(
        "base.People",
        related_name="person_comment_relationship",
        on_delete=models.CASCADE,
    )  # translatable_comment = models.ForeignKey(TranslatablePage, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey("content_type", "object_id")
    path = models.TextField(verbose_name=("URL path"), blank=True, editable=False)
    # instead of linking to a post only, we'll be using a generic foreign key to allow us to add a comment to any new app installed
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    created = models.DateTimeField(
        auto_now_add=True, help_text="(automatic) created date"
    )
    objects = CommentManager()
    content_panels = Page.content_panels + [FieldPanel("content", classname="full")]

    def __str__(self):
        if self.content_type == TranslatablePage:
            return f"A comment by: {self.user} in on the TranslatablePage: {self.page_name(self.object_id)}"
        return f"A comment by: {self.user}"

    def page_name(self, id):
        return TranslatablePage.objects.get(translatable_page_ptr_id=id).url_path

    def get_user(self):
        """
        Similar to the authors function above we're returning all the comments that
        are related to the blog post into a list we can access on the template.
        """
        user_comment = self.user
        return user_comment

    @property
    def get_subcomments(self):
        """
        Similar to the authors function above we're returning all the comments that
        are related to the blog post into a list we can access on the template.
        """
        sub_comments = Comment.objects.filter_by_instance(
            object_id=self.id, content_type=Comment
        )
        if sub_comments.exists():
            return sub_comments

    class Meta:
        ordering = ["timestamp"]
