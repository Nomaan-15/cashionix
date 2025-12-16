from django.urls import path
from .views import login_view, register_view, logout_view, check_auth

urlpatterns = [
    path("login/", login_view),
    path("register/", register_view),
    path("logout/", logout_view),
    path("check/", check_auth),
]
