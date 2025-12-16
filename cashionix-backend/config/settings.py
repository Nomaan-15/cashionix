import os
import dj_database_url
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-your-default-key-change-this')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',  # This allows any Railway subdomain
    '.vercel.app',   # This allows any Vercel subdomain
    'cashionix.in',  # Future use - won't cause problems
    'www.cashionix.in',
    'api.cashionix.in',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',  # This one is missing!
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    # Your apps
    'authentication',
    'devices',
    'orders',
]

# MIDDLEWARE - Add WhiteNoise
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this line
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Make sure this is here
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database
DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS settings - Add your Vercel URL when you get it
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # For local development
    "http://localhost:3001",
    # Add your Vercel URL here like: "https://cashionix.vercel.app"
    # Future: "https://cashionix.in", "https://www.cashionix.in"
]

# Optional: Allow all origins temporarily for testing (REMOVE IN PRODUCTION)
# CORS_ALLOW_ALL_ORIGINS = True  # Uncomment only for testing

CORS_ALLOW_CREDENTIALS = True