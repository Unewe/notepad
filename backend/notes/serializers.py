from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    backgroundColor = serializers.CharField(max_length=255, required=False, allow_blank=True, source='background_color')

    class Meta:
        model = Note
        fields = ['id', 'text', 'color', 'label', 'backgroundColor']


class NotePutSerializer(NoteSerializer):
    id = serializers.IntegerField(required=True, source='pk')
