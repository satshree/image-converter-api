# from django.shortcuts import render
from django.views import View
from django.http import FileResponse, JsonResponse  # , HttpResponse
from .utilities import convert_image


class Convert(View):
    def post(self, request, *args, **kwargs):
        try:
            image = request.FILES.get("image")
            converted_file = convert_image(image)
        except Exception as e:
            print("-" * 100)
            print("Exception caught from 'converter.views.Convert',", str(e))
            print("-" * 100)
            return JsonResponse({"status": False, "message": str(e)}, status=500)
        else:
            return FileResponse(converted_file)
        # return super().get(request, *args, **kwargs)
