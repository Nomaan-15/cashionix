from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from devices.models import Device
from .models import SellOrder

@csrf_exempt
@require_http_methods(["GET", "POST"])
def add_sell_order(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            data = json.loads(request.body)
            
            print("Received data:", data)
            
            # Extract data from frontend
            device_type = data.get('device_type')
            brand = data.get('brand')
            model = data.get('model')
            final_price = data.get('final_price')
            
            # Contact info
            name = data.get('name')
            phone = data.get('phone')
            email = data.get('email')
            address = data.get('address')
            
            # Questionnaire answers
            answers = data.get('answers', {})
            
            # Validate required fields
            if not all([device_type, brand, model, final_price, name, phone, email, address]):
                missing = []
                if not device_type: missing.append('device_type')
                if not brand: missing.append('brand')
                if not model: missing.append('model')
                if not final_price: missing.append('final_price')
                if not name: missing.append('name')
                if not phone: missing.append('phone')
                if not email: missing.append('email')
                if not address: missing.append('address')
                
                return JsonResponse({
                    'success': False,
                    'error': 'Please fill in all required fields.',
                    'missing_fields': missing
                }, status=400)
            
            # Find or create the device
            device, created = Device.objects.get_or_create(
                brand=brand,
                model=model,
                device_type=device_type,
                defaults={'base_price': final_price}
            )
            
            if created:
                print(f"Created new device: {device}")
            
            # Determine condition from questionnaire answers
            # You can make this more sophisticated based on your needs
            condition = 'good'  # default
            if answers:
                # Simple logic: check body condition from answers
                body_condition = answers.get('body', '')
                if body_condition == 'flawless':
                    condition = 'excellent'
                elif body_condition in ['good', 'average']:
                    condition = 'good'
                else:
                    condition = 'fair'
            
            # Create the sell order
            order = SellOrder.objects.create(
    device=device,
    condition=condition,
    final_price=final_price,
    pickup_address=address,
    customer_name=name,
    customer_phone=phone,
    customer_email=email,
    questionnaire_answers=answers,
    status='REQUESTED'
)
            
            print(f"Created order: {order.id}")
            
            return JsonResponse({
                'success': True,
                'message': f'Order #{order.id} created successfully!',
                'order_id': order.id,
                'data': {
                    'device': f"{device.brand} {device.model}",
                    'price': order.final_price,
                    'status': order.status
                }
            }, status=201)
            
        except json.JSONDecodeError as e:
            return JsonResponse({
                'success': False,
                'error': f'Invalid JSON data: {str(e)}'
            }, status=400)
        except Exception as e:
            print(f"Exception occurred: {str(e)}")
            import traceback
            traceback.print_exc()
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)
    
    # GET request - return list of devices
    devices = Device.objects.all().values('id', 'brand', 'model', 'device_type', 'base_price')
    return JsonResponse({
        'success': True,
        'devices': list(devices)
    })