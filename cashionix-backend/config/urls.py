from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_home(request):
    return JsonResponse({
        "message": "Cashionix Backend API",
        "status": "running",
        "endpoints": {
            "admin": "/admin/",
            "auth_check": "/api/auth/check/",
            "auth_login": "/api/auth/login/",
            "auth_register": "/api/auth/register/",
            "auth_logout": "/api/auth/logout/",
            "orders": "/api/orders/sell/"
        }
    })

urlpatterns = [
    path('', api_home),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/orders/', include('orders.urls')),
]
