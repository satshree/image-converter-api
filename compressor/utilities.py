from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from converter.utilities import convert_image


def compress_image(image_to_compress, limit):
    image = Image.open(image_to_compress)
    img_format = image.format.lower()

    if img_format == "png":
        image = Image.open(convert_image(
            image_to_convert=image_to_compress))

    compressed_image_io = BytesIO()

    image.save(compressed_image_io, format=image.format, quality=limit)
    compressed_file_name = f"{image_to_compress.name}.{image.format.lower()}"
    compressed_file = ContentFile(
        compressed_image_io.getvalue(), compressed_file_name)

    image.close()

    if img_format == "png":
        compressed_file = convert_image(image_to_convert=compressed_file)

    return compressed_file
