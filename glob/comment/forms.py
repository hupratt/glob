from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
    
class AddCommentForm(forms.Form):
    content = forms.CharField(help_text="Enter a comment")
    obj = forms.IntegerField(help_text="Translatable blog instance id")

    def clean_renewal_date(self):
        data = self.cleaned_data['content']
        if len(data) > 0:
            return data
        else:
            raise ValidationError(_('Invalid content - renewal in past'))

        