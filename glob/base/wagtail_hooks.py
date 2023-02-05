from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register,
)

from glob.breads.models import Country, BreadIngredient, BreadType
from glob.base.models import People, FooterText
from glob.comment.models import Comment

# When account is created via social, fire django-allauth signal to populate Django User record.
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from glob.base.models import People
from django.core.files import File
from tempfile import NamedTemporaryFile
import urllib
import os
from django.shortcuts import get_object_or_404
from wagtail.images.models import Image

"""
N.B. To see what icons are available for use in Wagtail menus and StreamField block types,
enable the styleguide in settings:

INSTALLED_APPS = (
   ...
   'wagtail.contrib.styleguide',
   ...
)

or see http://kave.github.io/general/2015/12/06/wagtail-streamfield-icons.html

This demo project includes the full font-awesome set via CDN in base.html, so the entire
font-awesome icon set is available to you. Options are at http://fontawesome.io/icons/.
"""


class BreadIngredientAdmin(ModelAdmin):
    # These stub classes allow us to put various models into the custom "Wagtail Bakery" menu item
    # rather than under the default Snippets section.
    model = BreadIngredient
    search_fields = ("name",)


class BreadTypeAdmin(ModelAdmin):
    model = BreadType
    search_fields = ("title",)


class BreadCountryAdmin(ModelAdmin):
    model = Country
    search_fields = ("title",)


class BreadModelAdminGroup(ModelAdminGroup):
    menu_label = "Bread Categories"
    menu_icon = "fa-suitcase"  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (BreadIngredientAdmin, BreadTypeAdmin, BreadCountryAdmin)


class PeopleModelAdmin(ModelAdmin):
    model = People
    menu_label = "People"  # ditch this to use verbose_name_plural from model
    menu_icon = "fa-users"  # change as required
    list_display = ("first_name", "last_name", "job_title", "thumb_image")
    list_filter = ("job_title",)
    search_fields = ("first_name", "last_name", "job_title")


class FooterTextAdmin(ModelAdmin):
    model = FooterText
    search_fields = ("body",)


class BakeryModelAdminGroup(ModelAdminGroup):
    menu_label = "Bakery Misc"
    menu_icon = "fa-cutlery"  # change as required
    menu_order = 300  # will put in 4th place (000 being 1st, 100 2nd)
    items = (PeopleModelAdmin, FooterTextAdmin)


class CommentModelAdmin(ModelAdmin):
    list_display = ["user", "content_type", "object_id", "timestamp", "content"]
    model = Comment
    menu_label = "Comments"
    menu_icon = "placeholder"
    menu_order = 290
    add_to_settings_menu = False
    exclude_from_explorer = False


@receiver(user_signed_up)
def user_signed_up_(request, user, sociallogin=None, **kwargs):
    """
    When a social account is created successfully and this signal is received,
    django-allauth passes in the sociallogin param, giving access to metadata on the remote account, e.g.:

    sociallogin.account.provider  # e.g. 'twitter'
    sociallogin.account.get_avatar_url()
    sociallogin.account.get_profile_url()
    sociallogin.account.extra_data['screen_name']

    See the socialaccount_socialaccount table for more in the 'extra_data' field.
    """

    if sociallogin:
        # Extract first / last names from social nets and store on User record
        if sociallogin.account.provider == "github":
            new = ""
            name = sociallogin.account.extra_data["name"]
            if " " in name:
                first_name, last_name = name.split(" ")
                new = People.objects.create(first_name=name, last_name=last_name)
            else:
                new = People.objects.create(first_name=name)
            picture_path = sociallogin.account.get_avatar_url()
            if picture_path is not None or picture_path is not "None":
                result = urllib.request.urlretrieve(picture_path)
                img, success = Image.objects.get_or_create(
                    file=File(open(result[0], "rb"))
                )
                new.image = img
                new.save()


# When using a ModelAdminGroup class to group several ModelAdmin classes together,
# you only need to register the ModelAdminGroup class with Wagtail:
modeladmin_register(BreadModelAdminGroup)
modeladmin_register(BakeryModelAdminGroup)
modeladmin_register(CommentModelAdmin)
