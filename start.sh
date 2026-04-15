#!/bin/bash
set -e

cd backend
pip install -r requirements.txt
python manage.py migrate --run-syncdb --no-input
python manage.py collectstatic --no-input
exec gunicorn page_and_prose.wsgi --bind 0.0.0.0:${PORT:-8000} --workers 2 --timeout 120
