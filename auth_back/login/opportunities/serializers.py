from rest_framework import serializers
from .models import Opportunity


class OpportunitySerializer(serializers.ModelSerializer):
    workMode = serializers.CharField(source='work_mode')
    postedDate = serializers.DateField(source='posted_date')
    contactEmail = serializers.EmailField(source='contact_email')

    class Meta:
        model = Opportunity
        fields = [
            'id', 'slug', 'title', 'type', 'organization', 'field', 'location',
            'workMode', 'deadline', 'postedDate', 'contactEmail',
            'description', 'content', 'requirements',
        ]