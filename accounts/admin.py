from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'account_number', 'account_type','balance', 'pin','is_active')