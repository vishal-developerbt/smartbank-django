from django.db import models

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=70,null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True ,unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    avatar = models.ImageField(upload_to='profile/avatar/', blank=True, null=True)
    bg_img = models.ImageField(upload_to='profile/background/', blank=True, null=True)
    city = models.CharField(max_length=254, blank=True, null=True)
    state = models.CharField(max_length=254, blank=True, null=True)
    zipcode = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=254, blank=True, null=True)
    dob = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=False, null=False)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def get_email_field_name(self):
        return 'email'


    def __str__(self):
        return self.email or "Customer"