import random
from django.core.mail import send_mail

def generate_account_number():
    return "SB" + str(random.randint(10000000, 99999999))


def generate_pin():
    return str(random.randint(1000, 9999))

def send_account_activation_email(customer):
    """
    Sends an account activation email to the newly registered customer.
    """
    try:
        subject = "Activate Your SmartBank Account"
        message = (
            f"Hi {customer.name},\n\n"
            f"Thank you for choosing SmartBank.\n\n"
            f"Your account has been approved successfully.\n"
            f"Account Number: {instance.account_number}\n\n"
            f"PIN: {instance.pin}\n\n"
            f"Please keep this information secure.\n"
            f"Thank you,\n"
            f"SmartBank Team"
        )
        from_email = "vishal.bluethink@gmail.com"
        recipient_list = [customer.email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
        print("Account Activation email sent successfully")

    except Exception as e:
        print("Failed to send account activation email:", e)

