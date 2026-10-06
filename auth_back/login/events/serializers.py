from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    registrationOpen = serializers.BooleanField(source='registration_open')
    registerLink = serializers.URLField(source='register_link', allow_null=True, required=False)
    registrationDeadline = serializers.DateField(source='registration_deadline', allow_null=True, required=False)

    class Meta:
        model = Event
        fields = [
            'id', 'slug', 'title', 'type', 'date', 'time', 'location', 'organizer',
            'image', 'description', 'content',
            'registrationOpen', 'registerLink', 'registrationDeadline',
        ]