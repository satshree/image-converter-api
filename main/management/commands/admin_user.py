import sys
from django.core.management.base import BaseCommand  # , CommandError
from main.utilities import check_admin


class Command(BaseCommand):
    help = 'Create admin user.'

    def handle(self, *args, **options):
        check_admin(verbose=True)
        sys.stdout.flush()
