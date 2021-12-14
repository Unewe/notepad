from django.urls import path

from .views import NoteApiView

app_name = 'notes'
urlpatterns = [
    path('notes', NoteApiView.as_view()),
]
