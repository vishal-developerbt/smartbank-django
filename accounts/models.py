from django.db import models
from customers.models import Customer
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Account(models.Model):

    ACCOUNT_TYPE_CHOICES = [
        ('saving', 'Saving Account'),
        ('current', 'Current Account'),
        ('salary', 'Salary Account'),
    ]

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
     
    customer_id = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    account_number = models.CharField(max_length=100, null=True, blank=True)
    account_type =  models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES,default='saving')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    loan =models.DecimalField(max_digits=12, decimal_places=2, default=0)
    pin = models.CharField(max_length=4, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    request_date = models.DateTimeField(auto_now_add=True)
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_requests"
    )
    reviewed_date = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.customer_id} - {self.account_type} - {self.status}"
