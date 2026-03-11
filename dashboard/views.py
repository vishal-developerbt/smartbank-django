from django.shortcuts import render, redirect
from django.contrib import messages
from customers.models import Customer
def session_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.session.get('customer_id'):
            return view_func(request, *args, **kwargs)
        messages.error(request, "Please log in first!")
        return redirect('login')
    return wrapper
# Create your views here.
def home(request):
    return render(request, 'home.html')

@session_login_required
def dashboard_page(request):
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    return render(request, 'dashboard.html', {'customer': customer})

@session_login_required
def personalization_page(request):
    # Optionally, get customer info
    # customer_id = request.session.get('customer_id')
    # customer = Customer.objects.get(id=customer_id)
    return render(request, 'personalization.html')



# def login(request):
#     return render(request, 'login.html')

# def register(request):
#     return render(request, 'register.html')