from django.urls import path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='Notepad',
        default_version='v1',
        description='Приложение с заметками',
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger'), name='schema-swagger-ui')
]
