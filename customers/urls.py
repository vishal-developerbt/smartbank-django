from django.urls import path
from customers import views as c_views
# import your view

urlpatterns = [
    path('login/', c_views.login, name="login"),
    path('register/', c_views.register, name="register"),
    path('activate/<str:uidb64>/<str:token>', c_views.activate_account, name="activate"),
    path('profile/', c_views.customer_profile_page, name="customer_profile_page"),
    
    path('update-profile/', c_views.customer_update_profile_page, name="customer_update_profile_page"),
    path('profile-update/', c_views.profile_update, name="profile_update"),
    path('logout/', c_views.user_logout, name='logout'),
]
