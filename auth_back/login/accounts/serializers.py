from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, Education, ProfessionalLink, WorkExperience
from .models import Publication
from .utils import fetch_doi_metadata

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'reg_no', 'id_no', 'first_name', 'last_name',
            'session', 'phone', 'password',
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'reg_no', 'id_no',
            'session', 'phone', 'workplace', 'designation',
            'profile_photo', 'is_verified',
            'location', 'about_me', 'mentorship_available', 'job_referral_available',
        ]
        read_only_fields = ['email', 'reg_no', 'id_no']

    def validate_profile_photo(self, value):
        max_size = 5 * 1024 * 1024
        if value and value.size > max_size:
            raise serializers.ValidationError("Image size must not exceed 5MB.")
        return value


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'department', 'specialization', 'start_year', 'end_year']

class ProfessionalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalLink
        fields = ['id', 'platform', 'url']


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = ['id', 'title', 'company', 'employment_type', 'start_date', 'end_date', 'primary_focus', 'skills']


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ['id', 'doi', 'title', 'authors', 'journal', 'year', 'link']
        read_only_fields = ['title', 'authors', 'journal', 'year', 'link']

    def create(self, validated_data):
        doi = validated_data.get('doi')
        metadata = fetch_doi_metadata(doi)

        if metadata:
            validated_data['title'] = metadata['title']
            validated_data['authors'] = metadata['authors']
            validated_data['journal'] = metadata['journal']
            validated_data['year'] = metadata['year']
            validated_data['link'] = metadata['link']
        else:
            validated_data['title'] = "Unable to fetch metadata — please verify the DOI"

        return super().create(validated_data)