from django.contrib import admin
from .models import SellOrder

@admin.register(SellOrder)
class SellOrderAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = (
        'id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'device',
        'condition',
        'final_price',
        'status',
        'created_at'
    )
    
    # Fields that can be clicked to open the detail view
    list_display_links = ('id', 'customer_name')
    
    # Add filters in the right sidebar
    list_filter = ('status', 'condition', 'created_at')
    
    # Add search functionality
    search_fields = (
        'customer_name',
        'customer_phone',
        'customer_email',
        'device__brand',
        'device__model'
    )
    
    # Fields to show in the detail/edit view
    fieldsets = (
        ('Customer Information', {
            'fields': ('customer_name', 'customer_phone', 'customer_email')
        }),
        ('Device Information', {
            'fields': ('device', 'condition')
        }),
        ('Order Details', {
            'fields': ('final_price', 'status', 'pickup_address')
        }),
        ('Additional Information', {
            'fields': ('questionnaire_answers',),
            'classes': ('collapse',)  # Make this section collapsible
        }),
    )
    
    # Make these fields read-only (optional)
    readonly_fields = ('created_at',)
    
    # Default ordering
    ordering = ('-created_at',)
    
    # Number of items per page
    list_per_page = 25
    
    # Add date hierarchy navigation
    date_hierarchy = 'created_at'
    
    # Customize the display of JSON field
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('created_at',)
        return self.readonly_fields