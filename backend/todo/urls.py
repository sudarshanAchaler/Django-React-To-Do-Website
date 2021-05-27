from django.urls import path, include
from rest_framework import routers
from .views import TodoView

router= routers.DefaultRouter()
router.register(r'todos',TodoView, 'todo')

urlpatterns = [
    path('', include(router.urls)),
]