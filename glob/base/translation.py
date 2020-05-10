from django.utils import translation

class TranslatedField:
    def __init__(self, en_field, fr_field):
        self.en_field = en_field
        self.fr_field = fr_field

    def __get__(self, instance, owner):
        if translation.get_language() == 'fr':
            return getattr(instance, self.fr_field)
        else:
            return getattr(instance, self.en_field)