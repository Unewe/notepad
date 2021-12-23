from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_swagger.views import get_swagger_view
from .views import index, redirect_to_index

schema_view = get_swagger_view(title='Описание API')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls', namespace='authentication')),
    path('api/', include('notes.urls', namespace='notes')),
    path('swagger', schema_view),
    re_path(r'^web*', index),
    re_path(r'^$', redirect_to_index)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
