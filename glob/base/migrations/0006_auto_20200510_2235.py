# Generated by Django 3.0.5 on 2020-05-10 22:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailforms', '0004_add_verbose_name_plural'),
        ('wagtailcore', '0045_assign_unlock_grouppagepermission'),
        ('wagtailsearchpromotions', '0002_capitalizeverbose'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        ('base', '0005_auto_20200510_2123'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='formpage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='formpage',
            name='page_ptr',
        ),
        migrations.DeleteModel(
            name='FormField',
        ),
        migrations.DeleteModel(
            name='FormPage',
        ),
    ]
