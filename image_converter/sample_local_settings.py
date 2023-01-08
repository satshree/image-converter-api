# DJANGO SETTINGS
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '5432',
    }
}

ALLOWED_HOSTS = ['*']


# CUSTOM
STAGING = False

# HEROKU
USE_HEROKU = False

# CLOUDINARY
CLOUDINARY_CLOUD_NAME = ''
CLOUDINARY_API_KEY = ''
CLOUDINARY_API_SECRET = ''

## OVERWRITE IF REQUIRED! ##
# CORS SETTINGS
# CORS_ORIGIN_ALLOW_ALL = False
# CORS_ALLOWED_ORIGINS = []
##

# STATIC FILES SETTINGS
# STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
# STATICFILES_FINDER = [
#     'django.contrib.staticfiles.finders.FileSystemFinder',
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',
# ]
