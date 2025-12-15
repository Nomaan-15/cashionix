from django.urls import path
from . import views

urlpatterns = [
    path('sell/', views.add_sell_order, name='add_sell_order'),
]