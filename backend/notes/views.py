from rest_framework import status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import NoteSerializer
from .models import Note


class NoteApiView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def get(self, request):
        user = request.user
        notes = Note.objects.filter(user_id=user.pk)
        serializer = self.serializer_class(notes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        note = request.data
        serializer = self.serializer_class(data=note)
        try:
            serializer.save()
        except serializers.ValidationError:
            raise serializers.ValidationError(
                'Ошибка при сохранении блокнота.'
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self):
        pass

    def delete(self):
        pass
    