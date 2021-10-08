from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

app_name = "converter"

urlpatterns = [
    path("", csrf_exempt(views.Convert.as_view()), name="convert")
]
