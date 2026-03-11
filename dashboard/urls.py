
from django.urls import path
from dashboard import views as d_views
# import your view

urlpatterns = [
    path('', d_views.home, name="home"), 
    path('dashboard', d_views.dashboard_page, name="dashboard"), 
    path('personalization/', d_views.personalization_page, name="personalization"),
]
