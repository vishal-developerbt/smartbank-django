
from django.urls import path
from accounts import views
# import your view

urlpatterns = [
    path('', views.customer_account_list, name="customer_account_list"), 
    path('create-account', views.add_customer_account, name="add_customer_account"), 
   path('save-account-request/', views.save_customer_account_through_request, name='save_customer_account'),

]
