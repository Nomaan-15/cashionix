from django.contrib import admin
from .models import SellOrder

@admin.register(SellOrder)
class SellOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'device', 'customer_name', 'final_price', 'status', 'created_at')
    list_filter = ('status', 'condition', 'created_at')
    search_fields = ('customer_name', 'customer_phone', 'customer_email')
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('customer_name', 'customer_phone', 'customer_email')
        }),
        ('Device Information', {
            'fields': ('device', 'condition')
        }),
        ('Order Details', {
            'fields': ('final_price', 'status', 'pickup_address', 'created_at')
        }),
        ('Additional Information', {
            'fields': ('questionnaire_answers',),
            'classes': ('collapse',)
        }),
    )