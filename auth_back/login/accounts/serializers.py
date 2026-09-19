from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import User, Education

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

    def validate_profile_photo(self, value):
        max_size = 5 * 1024 * 1024
        if value and value.size > max_size:
            raise serializers.ValidationError("Image size must not exceed 5MB.")
        return value


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'department', 'specialization', 'start_year', 'end_year']