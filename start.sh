#!/bin/bash
set -e

cd backend
pip install -r requirements.txt
python manage.py migrate --no-input
python manage.py collectstatic --no-input
gunicorn page_and_prose.wsgi --bind 0.0.0.0:${PORT:-8000}
