from django.db import models
from django.conf import settings
from accounts.models import Account


User = settings.AUTH_USER_MODEL


class Transaction(models.Model):

    TRANSACTION_TYPE = [
        ("deposit", "Deposit"),
        ("withdraw", "Withdraw"),
        ("transfer", "Transfer"),
    ]

    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    balance_after_transaction = models.DecimalField(max_digits=12, decimal_places=2)
    reference_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.account.account_number} - {self.transaction_type} - {self.amount}"
