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
        fields = ['id', 'degree', 'institution', 'department', 'specialization', 'timeline']


class ProfessionalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalLink
        fields = ['id', 'platform', 'url']


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkExperience
        fields = ['id', 'designation', 'company', 'employment_type', 'timeline', 'primary_focus', 'skills']


class PublicationSerializer(serializers.ModelSerializer):
    link = serializers.CharField(source='doi', write_only=True)
    publication_url = serializers.URLField(source='link', read_only=True)

    class Meta:
        model = Publication
        fields = ['id', 'link', 'title', 'authors', 'journal', 'year', 'publication_url']
        read_only_fields = ['title', 'authors', 'journal', 'year']   # ← 'link' মুছে দেওয়া হলো

    def create(self, validated_data):
        doi = validated_data.get('doi', '').strip()
        clean_doi = doi.replace("https://doi.org/", "").replace("http://doi.org/", "")

        validated_data['doi'] = clean_doi

        metadata = None
        try:
            metadata = fetch_doi_metadata(clean_doi)
        except Exception:
            metadata = None

        validated_data.pop('link', None)

        if metadata:
            validated_data['title'] = metadata.get('title') or ''
            validated_data['authors'] = metadata.get('authors') or ''
            validated_data['journal'] = metadata.get('journal') or ''
            validated_data['year'] = metadata.get('year')
            validated_data['link'] = metadata.get('link') or f"https://doi.org/{clean_doi}"
        else:
            validated_data['title'] = "Unable to fetch metadata — please verify the DOI"
            validated_data['link'] = f"https://doi.org/{clean_doi}"

        return super().create(validated_data)