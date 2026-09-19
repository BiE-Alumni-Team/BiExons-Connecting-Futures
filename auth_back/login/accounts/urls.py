from django.urls import path
from .views import RegisterView, ProfileView, EducationDetailView, EducationListCreateView
from .views import (
    ProfessionalLinkListCreateView, ProfessionalLinkDetailView,
    WorkExperienceListCreateView, WorkExperienceDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('education/', EducationListCreateView.as_view(), name='education-list'),
    path('education/<int:pk>/', EducationDetailView.as_view(), name='education-detail'),
    path('links/', ProfessionalLinkListCreateView.as_view(), name='links-list'),
    path('links/<int:pk>/', ProfessionalLinkDetailView.as_view(), name='links-detail'),
    path('experience/', WorkExperienceListCreateView.as_view(), name='experience-list'),
    path('experience/<int:pk>/', WorkExperienceDetailView.as_view(), name='experience-detail'),
]