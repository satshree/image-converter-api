from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


def convert_image(image_to_convert):
    image = Image.open(image_to_convert)
    image_format = image.format.lower()

    image.convert(mode="RGB")
    converted_image_io = BytesIO()

    if image_format in ("jpeg", "jpg"):
        format_to_convert = "png"
    else:
        format_to_convert = "jpeg"

    image.save(converted_image_io, format=format_to_convert)
    converted_file_name = f"{image_to_convert.name}.{format_to_convert}"
    converted_file = ContentFile(
        converted_image_io.getvalue(), converted_file_name)

    image.close()

    return converted_file
