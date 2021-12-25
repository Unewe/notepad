## Для запуска в Docker:
```
docker-compose up -d
```
## Доступ
### Апи:
http://localhost:8000/api
### Фронт:
http://localhost:8000/web
### Документация апи:
http://localhost:8000/swagger

## Для запуска вручную:
### Backend:
Необходимо создать (postgres) базу данных notepad
```
python3 -m venv note-env
source note-env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend:
```
cd frontend
npm install
npm start
```