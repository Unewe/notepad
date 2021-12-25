from django.contrib.auth import authenticate
from drf_yasg import openapi
from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128,
        min_length=3,
        write_only=True
    )

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'token']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if username is None:
            raise serializers.ValidationError(
                'Не указано имя пользователя.'
            )

        # Вызвать исключение, если не предоставлен пароль.
        if password is None:
            raise serializers.ValidationError(
                'Не указан пароль.'
            )

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError(
                'Неверно указано имя пользователя или пароль.'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'Пользователь заблокирован.'
            )

        return {
            'id': user.pk,
            'username': user.username,
            'token': user.token,
            'password': user.password
        }


class ResponseSerializerWithToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'token']


login_response = openapi.Response('response description', ResponseSerializerWithToken)


class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


user_response = openapi.Response('response description', ResponseSerializer)
