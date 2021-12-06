pip3 freeze > requirements.txt

*** Для добавления модулей.
python manage.py startapp apiName

INSTALLED_APPS = [
    'apiName.apps.MyapiConfig', ...
]

*** Для запуска:
python manage.py runserver

*** Для запуска миграций
python manage.py makemigrations
python manage.py migrate