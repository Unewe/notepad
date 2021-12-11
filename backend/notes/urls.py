from django.urls import path

from .views import NoteApiView

app_name = 'notes'
urlpatterns = [
    path('test/', NoteApiView.as_view()),
]
