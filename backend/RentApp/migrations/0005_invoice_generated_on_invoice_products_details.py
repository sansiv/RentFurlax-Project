# Generated by Django 4.1.13 on 2024-02-21 16:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('RentApp', '0004_remove_invoice_user_invoice_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='generated_on',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='invoice',
            name='products_details',
            field=models.JSONField(default=dict),
        ),
    ]