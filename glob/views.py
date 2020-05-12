from django.shortcuts import render

import datetime

from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from wagtailtrans.models import TranslatablePage, Page
from django.contrib.contenttypes.models import ContentType

from glob.comment.forms import AddCommentForm
from glob.comment.models import Comment
from glob.base.models import People

def add_comment(request, pk=9):
    content_type = ContentType.objects.get_for_model(TranslatablePage)
    person=get_object_or_404(People, pk = 1)
    # If this is a POST request then process the Form data
    if request.method == 'POST':

        # Create a form instance and populate it with data from the request (binding):
        form = AddCommentForm(request.POST)

        # Check if the form is valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
            t = Comment.objects.create(object_id=9, content_type=content_type, content=form.cleaned_data['content'], user=person)
            # redirect to a new URL:
            return render(request, 'blog/blog_index_page.html')

    # If this is a GET (or any other method) create the default form.
    else:
        form = AddCommentForm(initial={'content': '',})

    return render(request, 'blog/blog_index_page.html')
