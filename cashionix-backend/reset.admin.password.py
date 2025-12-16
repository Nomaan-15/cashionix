"""
One-time script to reset Django superuser password
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Get credentials from environment variables
ADMIN_USERNAME = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
ADMIN_EMAIL = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
ADMIN_PASSWORD = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if not ADMIN_PASSWORD:
    print("ERROR: DJANGO_SUPERUSER_PASSWORD environment variable not set!")
    exit(1)

try:
    user = User.objects.get(username=ADMIN_USERNAME)
    user.set_password(ADMIN_PASSWORD)
    user.save()
    print(f"✓ Password reset successfully for user: {ADMIN_USERNAME}")
except User.DoesNotExist:
    # Create new superuser if doesn't exist
    User.objects.create_superuser(
        username=ADMIN_USERNAME,
        email=ADMIN_EMAIL,
        password=ADMIN_PASSWORD
    )
    print(f"✓ Created new superuser: {ADMIN_USERNAME}")
except Exception as e:
    print(f"ERROR: {str(e)}")
    exit(1)