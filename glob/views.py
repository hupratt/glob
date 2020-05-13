from django.shortcuts import render

import datetime

from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from wagtailtrans.models import TranslatablePage, Page
from django.contrib.contenttypes.models import ContentType

from glob.comment.forms import AddCommentForm
from glob.comment.models import Comment
from glob.base.models import People
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

# import the logging library
import logging
from django.utils.translation import get_language
from django.shortcuts import redirect

# Get the instance of the logger specified in the settings file
logger = logging.getLogger("django")


def add_comment(request):
    content_type = ContentType.objects.get_for_model(TranslatablePage)
    if request.user.is_authenticated:
        user = get_object_or_404(People, pk=request.user.pk)
        # If this is a POST request then process the Form data
        if request.method == "POST":
            # Create a form instance and populate it with data from the request (binding):
            form = AddCommentForm(request.POST)
            # Check if the form is valid:
            if form.is_valid():
                # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
                t = Comment.objects.create(
                    object_id=form.cleaned_data["obj"],
                    content_type=content_type,
                    content=form.cleaned_data["content"],
                    user=user,
                )
                # redirect to a new URL:
                return HttpResponseRedirect(("/"))
        # If this is a GET (or any other method) create the default form.
        else:
            form = AddCommentForm(initial={"content": ""})
    else:
        messages.add_message(
            request,
            messages.ERROR,
            _("No authentification found: please login to post a comment"),
        )
        logger.error("No authentification")
        return HttpResponseRedirect(("/"))

    return render(request, "frontend/index.html")


def add_comment_of_comment(request):
    content_type = ContentType.objects.get_for_model(Comment)
    if request.user.is_authenticated:
        user = get_object_or_404(People, pk=request.user.pk)
        # If this is a POST request then process the Form data
        if request.method == "POST":
            # Create a form instance and populate it with data from the request (binding):
            form = AddCommentForm(request.POST)
            # Check if the form is valid:
            if form.is_valid():
                # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
                t = Comment.objects.create(
                    object_id=form.cleaned_data["obj"],
                    content_type=content_type,
                    content=form.cleaned_data["content"],
                    user=user,
                )
                # redirect to a new URL:
                return HttpResponseRedirect(("/"))
        # If this is a GET (or any other method) create the default form.
        else:
            form = AddCommentForm(initial={"content": ""})
    else:
        messages.add_message(
            request,
            messages.ERROR,
            _("No authentification found: please login to post a comment"),
        )
        return HttpResponseRedirect(("/"))

    return render(request, "frontend/index.html")


def page_redirect(request):
    # logger.info(f"redirecting to: {get_language()}")
    # return redirect(f"{get_language()}/")
    return render(request, "frontend/index.html")
