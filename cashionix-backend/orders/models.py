from django.db import models
from devices.models import Device

class SellOrder(models.Model):
    CONDITION_CHOICES = (
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('fair', 'Fair'),
    )

    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    final_price = models.IntegerField()
    pickup_address = models.TextField()
    status = models.CharField(max_length=20, default='REQUESTED')
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Additional contact fields
    customer_name = models.CharField(max_length=100, blank=True)
    customer_phone = models.CharField(max_length=20, blank=True)
    customer_email = models.EmailField(blank=True)
    
    # Store questionnaire answers as JSON
    questionnaire_answers = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"Order #{self.id} - {self.device} - ₹{self.final_price}"