from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = "compressor"

urlpatterns = [
    path("", csrf_exempt(views.Compress.as_view()), name="compress")
]
