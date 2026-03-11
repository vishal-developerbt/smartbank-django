from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Account
from .utils import generate_account_number, generate_pin  


@receiver(pre_save, sender=Account)
def account_approved_handler(sender, instance, **kwargs):
    
    if instance.status == "approved" and not instance.account_number:
        
        instance.account_number = generate_account_number()
        instance.pin = generate_pin()
        instance.is_active = True
        
        send_account_activation_email(instance)



def send_account_activation_email(account):
    try:
        if not account.customer_id:
            print("No customer attached to this account.")
            return

        subject = "Your SmartBank Account is Approved"

        message = (
            f"Hi {account.customer_id.name},\n\n"
            f"Your account has been approved successfully.\n\n"
            f"Account Number: {account.account_number}\n"
            f"PIN: {account.pin}\n\n"
            f"Please keep this information secure.\n\n"
            f"Thank you,\n"
            f"SmartBank Team"
        )

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [account.customer_id.email],
            fail_silently=False,
        )

        print("Account Activation email sent successfully")

    except Exception as e:
        print("Failed to send account activation email:", e)
