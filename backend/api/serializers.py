from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# sagt python wie die json data für jwt zu interpretieren ist
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password'] # felder werden akzeptiert für erstellen und return von neuen usern
        extra_kwargs = {'password': {'write_only': True}} # feld wird für erstellen akzeptiert aber nicht returnt, niemand kann es auslesen

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}} # author ist automatisch der ersteller, man darf nicht entscheiden wer das ist    