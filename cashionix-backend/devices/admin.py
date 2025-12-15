from django.contrib import admin
from .models import Device

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', 'brand', 'model', 'device_type', 'base_price')
    list_filter = ('device_type', 'brand')
    search_fields = ('brand', 'model')