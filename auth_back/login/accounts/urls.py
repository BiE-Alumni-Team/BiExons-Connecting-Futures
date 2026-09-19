from django.urls import path
from .views import RegisterView, ProfileView, EducationDetailView, EducationListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('education/', EducationListCreateView.as_view(), name='education-list'),
    path('education/<int:pk>/', EducationDetailView.as_view(), name='education-detail'),
]