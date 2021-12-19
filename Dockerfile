FROM node:16.13.1-alpine AS npmBuilder
RUN mkdir /app
WORKDIR /app
COPY ./frontend ./
RUN npm i
RUN npm run build


FROM python:3.8.3-alpine as pythonBuilder

RUN mkdir /app
ADD ./backend /app
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install -r requirements.txt
RUN sed -i 's/localhost/database/g' /app/notepad/settings.py

COPY --from=npmBuilder /app/build /app/static

CMD ["python", "manage.py migrate"]