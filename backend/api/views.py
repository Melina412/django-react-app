from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # alle user um zu prüfen ob neuer user schon existiert
    serializer_class = UserSerializer # welche art von data wird akzeptiert um einen neuen user zu erstellen
    permission_classes = [AllowAny] # wer darf das aufrufen (in dem fall: jeder kann einen neuen uder erstellen)

## einfache api route um die user in der db zu checken
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_user_list(request):
    users = User.objects.all()
    user_data = [{'name': user.username, 'id': user.id} for user in users]
    return Response(user_data)


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)