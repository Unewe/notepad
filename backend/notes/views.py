from rest_framework import status, serializers
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import NoteSerializer
from .models import Note


class NoteApiView(GenericAPIView):
    """
    retrieve:
        Return a user instance.

    list:
        Return all users, ordered by most recently joined.

    create:
        Create a new user.

    delete:
        Remove an existing user.

    partial_update:
        Update one or more fields on an existing user.

    update:
        Update a user.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = NoteSerializer

    def get(self, request):
        """
        Список заметок для текущего пользователя
        """

        user = request.user
        notes = Note.objects.filter(user_id=user.pk).order_by('created_at')
        serializer = self.serializer_class(notes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Сохранение новой заметки
        """
        user = request.user
        note = request.data
        serializer = self.serializer_class(data=note)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user_id=user.pk)
        except serializers.ValidationError:
            raise serializers.ValidationError(
                'Ошибка при сохранении блокнота.'
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        user = request.user
        note = request.data
        instance = Note.objects.get(user_id=user.pk, id=note.get('id'))

        if instance is None:
            raise serializers.ValidationError('Давай, завязывай!')

        serializer = self.serializer_class(data=note)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.update(instance, note)
        except serializers.ValidationError:
            raise serializers.ValidationError('Ошибка при обновлении блокнота.')
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        """
        Удаление заметки
        """
        user = request.user
        note_id = request.query_params.get('id', -1)
        Note.objects.get(user_id=user.pk, id=note_id).delete()
        return Response(status=status.HTTP_200_OK)
