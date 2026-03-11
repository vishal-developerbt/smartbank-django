from django.shortcuts import render,redirect
from .models import Customer,Account
from django.contrib import messages
import random

def session_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.session.get('customer_id'):
            return view_func(request, *args, **kwargs)
        messages.error(request, "Please log in first!")
        return redirect('login')
    return wrapper

@session_login_required
def add_customer_account(request):
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    return render(request, 'create_account_form.py',{'customer':customer})



@session_login_required
def customer_account_list(request):
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    accounts = Account.objects.all()
    return render(request, 'customer_account_list.py',{'customer':customer ,'accounts':accounts})

@session_login_required
def save_customer_account_through_request(request):

    if request.method == "POST":
        customer_id = request.session.get('customer_id')
        customer = Customer.objects.get(id=customer_id)
        account_type = request.POST.get('account_type')
        Account.objects.create(
            customer_id=customer,
            account_type=account_type
        )
        messages.success(request, "Account request submitted successfully!")
        return redirect('add_customer_account')
    return redirect('add_customer_account')
