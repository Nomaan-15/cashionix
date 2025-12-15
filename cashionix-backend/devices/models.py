from django.db import models

# Create your models here.
from django.db import models

class Device(models.Model):
    DEVICE_TYPE_CHOICES = (
        ('phone', 'Phone'),
        ('laptop', 'Laptop'),
    )

    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=100)
    device_type = models.CharField(max_length=10, choices=DEVICE_TYPE_CHOICES)
    base_price = models.IntegerField()

    def __str__(self):
        return f"{self.brand} {self.model}"
