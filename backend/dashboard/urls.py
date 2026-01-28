from django.urls import path
from .views import DashboardStatsView, DashboardCasesView, CareerApplicationView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('cases/', DashboardCasesView.as_view(), name='dashboard-cases'),
    path('career/apply/', CareerApplicationView.as_view(), name='career-apply'),
]
