from django.db import migrations
import random
import string

def generate_order_ids(apps, schema_editor):
    SellOrder = apps.get_model('orders', 'SellOrder')
    used_codes = set()
    
    for order in SellOrder.objects.all():
        if not order.order_id:
            while True:
                code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                if code not in used_codes and not SellOrder.objects.filter(order_id=code).exists():
                    order.order_id = code
                    used_codes.add(code)
                    order.save()
                    break

def reverse_func(apps, schema_editor):
    pass

class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_sellorder_order_id'),  # Make sure this matches!
    ]

    operations = [
        migrations.RunPython(generate_order_ids, reverse_func),
    ]