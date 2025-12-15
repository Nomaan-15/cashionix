from django.shortcuts import render

# Create your views here.
# authentication/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
def register_view(request):
    """
    Register a new user
    POST: /api/auth/register/
    Body: {
        "username": "string",
        "email": "string",
        "password": "string",
        "full_name": "string"
    }
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            full_name = data.get('full_name', '')
            
            # Validation
            if not username or not email or not password:
                return JsonResponse({
                    'success': False,
                    'error': 'All fields are required'
                }, status=400)
            
            # Check if user already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({
                    'success': False,
                    'error': 'Username already exists'
                }, status=400)
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    'success': False,
                    'error': 'Email already registered'
                }, status=400)
            
            # Create user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            if full_name:
                user.first_name = full_name
                user.save()
            
            # Auto login after registration
            login(request, user)
            
            return JsonResponse({
                'success': True,
                'message': 'Registration successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'full_name': user.first_name
                }
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def login_view(request):
    """
    Login user
    POST: /api/auth/login/
    Body: {
        "username": "string",
        "password": "string"
    }
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return JsonResponse({
                    'success': False,
                    'error': 'Username and password are required'
                }, status=400)
            
            # Authenticate user
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return JsonResponse({
                    'success': True,
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'full_name': user.first_name
                    }
                })
            else:
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid username or password'
                }, status=401)
                
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def logout_view(request):
    """
    Logout user
    POST: /api/auth/logout/
    """
    if request.method == 'POST':
        logout(request)
        return JsonResponse({
            'success': True,
            'message': 'Logout successful'
        })
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


def check_auth(request):
    """
    Check if user is authenticated
    GET: /api/auth/check/
    """
    if request.user.is_authenticated:
        return JsonResponse({
            'authenticated': True,
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'full_name': request.user.first_name
            }
        })
    else:
        return JsonResponse({
            'authenticated': False
        })