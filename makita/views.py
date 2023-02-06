from django.shortcuts import render


def page_redirect(request):
    return render(request, "frontend/index.html")
