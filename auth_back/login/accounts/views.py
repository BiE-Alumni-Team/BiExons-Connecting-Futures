from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer
from .models import Education, ProfessionalLink, WorkExperience
from .serializers import EducationSerializer, ProfessionalLinkSerializer, WorkExperienceSerializer
from .models import Publication
from .serializers import PublicationSerializer


class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class EducationListCreateView(generics.ListCreateAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EducationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)
    
class ProfessionalLinkListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfessionalLinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ProfessionalLink.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfessionalLinkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfessionalLinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ProfessionalLink.objects.filter(user=self.request.user)


class WorkExperienceListCreateView(generics.ListCreateAPIView):
    serializer_class = WorkExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkExperience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkExperienceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkExperience.objects.filter(user=self.request.user)


class PublicationListCreateView(generics.ListCreateAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Publication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PublicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Publication.objects.filter(user=self.request.user)