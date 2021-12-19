from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls', namespace='authentication')),
    path('api/', include('notes.urls', namespace='notes')),
    re_path(r'^(?!(?=api/)|(?=admin/)|(?=static/)).*$', index)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
