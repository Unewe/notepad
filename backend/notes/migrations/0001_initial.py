# Generated by Django 3.2.9 on 2021-11-30 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=255)),
                ('label', models.CharField(max_length=100)),
            ],
        ),
    ]
