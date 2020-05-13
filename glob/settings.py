"""
Django settings for temp project.

Generated by 'django-admin startproject' using Django 1.10.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os
from django.utils.translation import gettext_lazy as _

LANGUAGES = [
    ('en', _('English')),
    ('de', _('German')),
    ('fr', _('French')),
    ('pt', _('Portuguese')),
]
# Build paths inside the project like this: os.path.join(PROJECT_DIR, ...)
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(PROJECT_DIR)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'glob.base',
    'glob.blog',
    'glob.breads',
    'glob.locations',
    'glob.search',
    'glob.comment',

    'wagtail.contrib.search_promotions',
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.api.v2',
    'wagtail.contrib.modeladmin',
    'wagtail.contrib.routable_page',
    'wagtail.core',

    'wagtail.contrib.settings',  # Only required when WAGTAILTRANS_LANGUAGES_PER_SITE=True
    'wagtailtrans',
    
    'rest_framework',
    'modelcluster',
    'taggit',
    'wagtailfontawesome',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.github',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'django.contrib.sites',
]

SITE_ID=2
LOGIN_REDIRECT_URL = "/"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'wagtail.core.middleware.SiteMiddleware',
    'wagtailtrans.middleware.TranslationMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'wagtail.core.middleware.SiteMiddleware',
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',

]

ROOT_URLCONF = 'glob.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['glob/templates', ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # `allauth` specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

WAGTAILTRANS_SYNC_TREE = True

WSGI_APPLICATION = 'glob.wsgi.application'

# BASE_URL required for notification emails
BASE_URL = 'http://localhost:3000'

# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

# Database

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "glob",
        "USER": os.environ.get("dbuser"),
        "PASSWORD": os.environ.get("dbpassword"),
        "HOST": os.environ.get("hostip"),
        "PORT": os.environ.get("pnumber"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en'

TIME_ZONE = "Europe/Luxembourg"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static'),
]

STATIC_ROOT = os.path.join(PROJECT_DIR, 'collect_static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(PROJECT_DIR, 'media')
MEDIA_URL = '/media/'

# Override in local settings or replace with your own key. Please don't use our demo key in production!
GOOGLE_MAP_API_KEY = 'AIzaSyD31CT9P9KxvNUJOwDq2kcFEIG8ADgaFgw'

# Use Elasticsearch as the search backend for extra performance and better search results
WAGTAILSEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'wagtail.search.backends.db',
        'INDEX': 'glob',
    },
}

# Wagtail settings
WAGTAIL_SITE_NAME = "glob"


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(name)s.%(funcName)s:%(lineno)s- %(message)s'
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR,'error.log'),
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            # output logs to the console and to the file
            'level': 'INFO',
            'handlers': ['file', 'console'], 
            'propagate': True,
        },

    },
}

print(os.path.join(BASE_DIR,'error.log'))


if 'AWS_STORAGE_BUCKET_NAME' in os.environ:
    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_AUTO_CREATE_BUCKET = True

    INSTALLED_APPS.append('storages')
    MEDIA_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

if 'GS_BUCKET_NAME' in os.environ:
    GS_BUCKET_NAME = os.getenv('GS_BUCKET_NAME')
    GS_PROJECT_ID = os.getenv('GS_PROJECT_ID')
    GS_DEFAULT_ACL = 'publicRead'
    GS_AUTO_CREATE_BUCKET = True

    INSTALLED_APPS.append('storages')
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'