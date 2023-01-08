import os
from django.conf import settings

try:
    CLOUDINARY_CLOUD_NAME = os.environ.get(
        "CLOUDINARY_CLOUD_NAME", settings.CLOUDINARY_CLOUD_NAME)
    CLOUDINARY_API_KEY = os.environ.get(
        "CLOUDINARY_API_KEY", settings.CLOUDINARY_API_KEY)
    CLOUDINARY_API_SECRET = os.environ.get(
        "CLOUDINARY_API_SECRET", settings.CLOUDINARY_API_SECRET)

    CLOUDINARY_STORAGE = {
        "CLOUD_NAME": CLOUDINARY_CLOUD_NAME,
        "API_KEY": CLOUDINARY_API_KEY,
        "API_SECRET": CLOUDINARY_API_SECRET,
        # 'EXCLUDE_DELETE_ORPHANED_MEDIA_PATHS': ('media/', 'images/')
    }

    CLOUDINARY_URL = "cloudinary://{}:{}@{}".format(
        CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME)

    import cloudinary
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True,
        # api_proxy="http://proxy.server:3128"
    )

    STATICFILES_STORAGE = "cloudinary_storage.storage.StaticHashedCloudinaryStorage"
except:
    pass
