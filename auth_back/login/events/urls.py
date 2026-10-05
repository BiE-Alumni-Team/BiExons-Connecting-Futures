from django.urls import path
from .views import EventListView, EventDetailView

urlpatterns = [
    path('', EventListView.as_view(), name='events-list'),
    path('<slug:slug>/', EventDetailView.as_view(), name='events-detail'),
]