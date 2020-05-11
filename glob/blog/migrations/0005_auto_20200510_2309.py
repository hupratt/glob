# Generated by Django 3.0.5 on 2020-05-10 23:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailtrans', '0009_create_initial_language'),
        ('blog', '0004_auto_20200510_2235'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpage',
            name='page_ptr',
        ),
        migrations.AddField(
            model_name='blogpage',
            name='translatablepage_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailtrans.TranslatablePage'),
            preserve_default=False,
        ),
    ]
