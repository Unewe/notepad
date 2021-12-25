from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationSerializer, LoginSerializer, user_response, login_response
from .renderers import UserJSONRenderer


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    @swagger_auto_schema(operation_description="Регистрация",
                         request_body=RegistrationSerializer,
                         responses={201: login_response})
    def post(self, request):
        user = request.data

        serializer = self.serializer_class(data=user)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except serializers.ValidationError:
            raise serializers.ValidationError(
                'Пользователь с таким именем уже существует.'
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    @swagger_auto_schema(operation_description="Авторизация",
                         request_body=RegistrationSerializer,
                         responses={200: login_response})
    def post(self, request):
        user = request.data

        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentUserApiView(APIView):
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(operation_description="Текущий пользователь", responses={200: user_response})
    def get(self, request):
        user = request.user
        return Response({"id": user.pk, "username": user.username}, status=status.HTTP_200_OK)
