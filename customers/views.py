from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Customer
from .forms import CustomerRegisterForm
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail

from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes,force_str
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.hashers import check_password
import logging
# -----------------------------------------
# Session-based login required decorator
# -----------------------------------------
def session_login_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.session.get('customer_id'):
            return view_func(request, *args, **kwargs)
        messages.error(request, "Please log in first!")
        return redirect('login')
    return wrapper

# -----------------------------------------
# Register view
# -----------------------------------------
def register(request):
    if request.method == "POST":
        form = CustomerRegisterForm(request.POST)
        if form.is_valid():
            customer = form.save(commit=False)
            customer.password = make_password(form.cleaned_data['password'])
            customer.save()
     
            uidb64 = urlsafe_base64_encode(force_bytes(customer.pk))
            token = default_token_generator.make_token(customer)
            activation_link = reverse('activate', kwargs={'uidb64':uidb64,'token':token})
            activation_url =f"{settings.SITE_DOMAIN}{activation_link}"
            send_welcome_email(customer)
            send_activation_email(customer ,activation_url)
            
            messages.success(request, "Account created successfully! Please login.")
            return redirect('login')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = CustomerRegisterForm()

    return render(request, 'register.html', {'form': form})

# -----------------------------------------
# Login view
# -----------------------------------------
def login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            customer = Customer.objects.get(email=email)
            if not customer.is_active:
                messages.error(
                    request,
                    "Your account is not activated. Please check your email."
                )
                return redirect('login')

            if check_password(password, customer.password):
                request.session['customer_id'] = customer.id
                request.session['customer_name'] = customer.name

                customer.last_login = timezone.now()
                customer.save(update_fields=['last_login'])

                messages.success(request, f"Welcome {customer.name}!")
                return redirect('dashboard')
            else:
                messages.error(request, "Invalid password")

        except Customer.DoesNotExist:
            messages.error(request, "Customer email not registered")

    return render(request, 'login.html')

# -----------------------------------------
# Profile page (only for logged-in users)
# -----------------------------------------
@session_login_required
def customer_profile_page(request):
    # Optionally, get customer info
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    return render(request, 'my_profile.html', {'customer': customer})

# -----------------------------------------
# personalization page (only for logged-in users)
# -----------------------------------------
@session_login_required
def customer_personalization_page(request):
    # Optionally, get customer info
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    return render(request, 'personalization.html', {'customer': customer})



# -----------------------------------------
# Logout view
# -----------------------------------------
def user_logout(request):
    request.session.flush()  # clears all session data
    messages.success(request, "You have been logged out successfully.")
    return redirect('login')

def activate_account(request, uidb64 ,token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        customer =Customer.objects.get(pk=uid)
        if customer.is_active:
            messages.warning(request, "This account is already been activated.")
            return redirect('login')
        if default_token_generator.check_token(customer,token):
            customer.is_active =True
            customer.save()
            messages.success(request, "Your account has been activated successfully.")
            return redirect('login')
        else:
            messages.warning(request, "This activation link is invalid or expired.")
            return redirect('login')
    except (TypeError, ValueError, OverflowError,Customer.DoesNotExist):
        messages.error(request, "Invalid activation link.")
        return redirect('login')

def send_activation_email(customer, activation_url):
    """
    Sends an account activation email to the newly registered customer.
    """
    try:
        subject = "Activate Your SmartBank Account"
        message = (
            f"Hi {customer.name},\n\n"
            f"Thank you for registering with SmartBank.\n\n"
            f"Please click the link below to activate your account:\n"
            f"{activation_url}\n\n"
            f"If you did not register, please ignore this email.\n\n"
            f"Regards,\n"
            f"SmartBank Team"
        )
        from_email = "vishal.bluethink@gmail.com"
        recipient_list = [customer.email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        print("Activation email sent successfully")

    except Exception as e:
        print("Failed to send activation email:", e)


def send_welcome_email(customer):
    """
    Sends a welcome email to the newly registered customer.
    """

    try:
        subject = "Welcome to SmartBank!"
        message = f"Hi {customer.name},\n\nThank you for registering with SmartBank. Your account has been created successfully."
        from_email = 'vishal.bluethink@gmail.com'
        recipient_list = [customer.email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        print("Send Email Successfully")
    except Exception as e:
        print("Not Send Email",e)

# -----------------------------------------
# Update Profile page (only for logged-in users)
# -----------------------------------------
@session_login_required
def customer_update_profile_page(request):
    # Optionally, get customer info
    customer_id = request.session.get('customer_id')
    customer = Customer.objects.get(id=customer_id)
    return render(request, 'profile_setting.html', {'customer': customer})


def profile_update(request):
    customer = Customer.objects.get(id=request.session['customer_id'])
    if request.method == "POST":
        customer.name = request.POST.get('name')
        customer.phone = request.POST.get('phone')
        customer.address = request.POST.get('address')
        customer.zipcode = request.POST.get('zipcode')
        customer.state = request.POST.get('state')
        customer.city = request.POST.get('city')
        if request.FILES.get('avatar'):
            customer.avatar = request.FILES.get('avatar')
        if request.FILES.get('bg_img'):
            customer.bg_img = request.FILES.get('bg_img')
        customer.save()
        return redirect('customer_profile_page')
    return render(request, 'profile.html', {'customer': customer})
