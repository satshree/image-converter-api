# from django.shortcuts import render
from django.views import View
from django.http import FileResponse, JsonResponse  # , HttpResponse
from .utilities import compress_image


class Compress(View):
    def post(self, request, *args, **kwargs):
        try:
            image = request.FILES.get("image")
            compress_limit = int(request.POST.get("compress"))
            compressed_file = compress_image(image, compress_limit)
        except Exception as e:
            print("-" * 100)
            print("Exception caught from 'compressor.views.Compress',", str(e))
            print("-" * 100)
            return JsonResponse({"status": False, "message": str(e)}, status=500)
        else:
            return FileResponse(compressed_file)
        # return super().get(request, *args, **kwargs)
