### Для запуска в Docker:
docker-compose up -d
Приложение будет доступно по адресу localhost:8000

### Для запуска вручную:
Необходимо создать (postgres) базу данных notepad

## Frontend:
npm install
npm start

## Backend:
python3 -m venv note-env
source note-env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver