from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_alter_orderitem_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=50, unique=True)),
                ('type', models.CharField(
                    choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')],
                    default='percentage',
                    max_length=20,
                )),
                ('value', models.DecimalField(decimal_places=2, max_digits=10)),
                ('min_purchase', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('max_uses', models.IntegerField(blank=True, null=True)),
                ('uses', models.IntegerField(default=0)),
                ('expiry_date', models.DateField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
