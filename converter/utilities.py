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
        image.save(converted_image_io, format=format_to_convert)
    else:
        format_to_convert = "jpeg"
        new_image = Image.new(mode="RGB", size=image.size,
                              color=(255, 255, 255))
        new_image.paste(image, (0, 0), image)
        new_image.save(converted_image_io, format=format_to_convert)

    converted_file_name = f"{image_to_convert.name}.{format_to_convert}"
    converted_file = ContentFile(
        converted_image_io.getvalue(), converted_file_name)

    image.close()

    return converted_file
