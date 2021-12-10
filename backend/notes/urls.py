from django.urls import path

from .views import TestApiView

app_name = 'notes'
urlpatterns = [
    path('test/', TestApiView.as_view()),
]
