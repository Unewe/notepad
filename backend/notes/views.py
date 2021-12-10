from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer


class TestApiView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.CharField()
    renderer_classes = (JSONRenderer,)

    def get(self, request):
        return Response({"Hello"}, status=status.HTTP_200_OK)
