from django.urls import path

from .views import RegistrationAPIView, LoginAPIView, CurrentUserApiView
from .renderers import UserJSONRenderer

app_name = 'authentication'
urlpatterns = [
    path('users', RegistrationAPIView.as_view()),
    path('users/login', LoginAPIView.as_view()),
    path('users/current', CurrentUserApiView.as_view())
]
renderer_classes = (UserJSONRenderer,)
