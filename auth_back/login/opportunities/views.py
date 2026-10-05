from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Opportunity
from .serializers import OpportunitySerializer


class OpportunityListView(generics.ListAPIView):
    queryset = Opportunity.objects.all().order_by('-posted_date')
    serializer_class = OpportunitySerializer
    permission_classes = [AllowAny]


class OpportunityDetailView(generics.RetrieveAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'