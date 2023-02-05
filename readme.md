# React/Wagtail blog

This is a demonstration project for the amazing [Wagtail CMS](https://github.com/wagtail/wagtail).
The front end will (eventually) be a react-redux single page app

<p align="center" width="100%">
    <img width="90%" src="https://github.com/hupratt/glob/blob/master/arch.drawio.png?raw=true">
</p>

C:\Users\santo\AppData\Local\Programs\Python\Python36-32\python.exe

from glob.blog.models import BlogPage
BlogPage.objects.get(id=5)

BlogPage.objects.get(id=5).authors()[0].image
BlogPage.objects.get(id=5).authors()[0].thumb_image
BlogPage.objects.get(id=5).authors()[0].image.get_rendition('fill-50x50').url


## Database UML
<p align="center" width="100%">
    <img width="90%" src="https://github.com/hupratt/glob/blob/master/db.png?raw=true">
</p>