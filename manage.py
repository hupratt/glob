#!/usr/bin/env python
import os
import sys

import dotenv


if __name__ == "__main__":
    if os.environ.get("DEBUG") == "True":
        dotenv.read_dotenv(os.path.join(os.path.dirname(__file__), ".env.development"))

    else:
        dotenv.read_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "glob.settings")
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
