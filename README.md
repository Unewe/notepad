### Для запуска в Docker:
docker-compose up -d

### Frontend:
npm install
npm start

### Backend:
python3 -m venv note-env
source note-env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver