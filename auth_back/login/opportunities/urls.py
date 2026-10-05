from django.urls import path
from .views import OpportunityListView, OpportunityDetailView

urlpatterns = [
    path('', OpportunityListView.as_view(), name='opportunities-list'),
    path('<slug:slug>/', OpportunityDetailView.as_view(), name='opportunities-detail'),
]