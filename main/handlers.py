from django.shortcuts import render


def handler403(request, exception):
    return render(request, "handlers/403.html", status=403)


def handler404(request, exception):
    return render(request, "handlers/404.html", status=404)


def handler500(request):
    # import sys
    # type_, value, traceback = sys.exc_info()
    # context = {
    #     "exception": {
    #         "type": type_,
    #         "value": value.__str__(),
    #         "traceback": traceback
    #     }
    # }

    # return render(request, "handlers/500.html", status=500, context=context)
    return render(request, "handlers/500.html", status=500)
