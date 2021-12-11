pip3 freeze > requirements.txt
pip install -r requirements.txt

*** Для добавления модулей.
python manage.py startapp apiName

INSTALLED_APPS = [
    'apiName.apps.MyapiConfig', ...
]

*** Для запуска:
pip install -r requirements.txt
python manage.py runserver

*** Окружение:
python3 -m venv ./venv
source env/bin/activate

*** Для запуска миграций
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser