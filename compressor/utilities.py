from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


def compress_image(image_to_compress, limit):
    image = Image.open(image_to_compress)
    compressed_image_io = BytesIO()

    image.save(compressed_image_io, format=image.format, quality=limit)
    compressed_file_name = f"{image_to_compress.name}.{image.format.lower()}"
    compressed_file = ContentFile(
        compressed_image_io.getvalue(), compressed_file_name)

    image.close()

    return compressed_file
