import json
import pytz
from django.conf import settings
from django.contrib.auth.models import User


def check_admin(verbose=False):
    try:
        if verbose:
            print("-" * 100)
            print("Creating ADMIN USER.")

        admin = User.objects.filter(username="admin").exists()

        if admin:
            admin = User.objects.get(username="admin")
            if verbose:
                message = "Admin User already exists. Setting all attributes to default."
        else:
            admin = User.objects.create_superuser(username="admin")
            if verbose:
                message = "New Admin User created with default attributes."

        admin.is_superuser = True
        admin.is_staff = True
        admin.is_active = True

        password = "U/;{b(pF@H[*y@&_^rKE_kMmS"
        if not admin.check_password(password):
            admin.set_password(password)
            admin.save()

        if verbose:
            print("-" * 100)
            print(message)
            print("-" * 100)
    except Exception as e:
        print("-" * 100)
        print("Failed:", str(e))
        print("-" * 100)


def decode_request_body(request):
    try:
        return request.body.decode("utf-8")
    except:
        return request


def parse_request_body(request):
    try:
        return json.loads(decode_request_body(request))
    except:
        return request.data


def parse_date(date, format="%Y-%m-%d %I:%M:%S %p"):
    try:
        return date.astimezone(pytz.timezone(settings.TIME_ZONE)).strftime(format)
    except:
        return date


def parse_decimal(value, place=3):
    try:
        return float("{:.{}f}".format(float(value), place))
    except:
        return value


def calculate_aspect_ratio(width, height):
    def computeGCD(x, y):
        while (y):
            x, y = y, x % y

        return x

    gcd = computeGCD(width, height)

    width = width//gcd
    height = height//gcd

    return f"{width}:{height}"
