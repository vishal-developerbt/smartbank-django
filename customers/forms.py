from django import forms
from .models import Customer

class CustomerRegisterForm(forms.ModelForm):
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter password'
        })
    )

    class Meta:
        model = Customer
        fields = ['name', 'email', 'phone', 'address', 'dob', 'password']  # include password
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your full name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter email address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter phone number'}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter address'}),
            'dob': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }
