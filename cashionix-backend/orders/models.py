from django.db import models
from django.utils import timezone
from devices.models import Device
import random
import string

class SellOrder(models.Model):
    CONDITION_CHOICES = (
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('fair', 'Fair'),
    )

    order_id = models.CharField(max_length=10, unique=True, blank=True)  # Added null=True
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    final_price = models.IntegerField()
    pickup_address = models.TextField()
    status = models.CharField(max_length=20, default='REQUESTED')
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    
    customer_name = models.CharField(max_length=100, blank=True)
    customer_phone = models.CharField(max_length=20, blank=True)
    customer_email = models.EmailField(blank=True)
    questionnaire_answers = models.JSONField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.order_id:
            while True:
                code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                if not SellOrder.objects.filter(order_id=code).exists():
                    self.order_id = code
                    break
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.order_id} - {self.device} - ₹{self.final_price}"