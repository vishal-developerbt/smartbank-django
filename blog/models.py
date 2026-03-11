from django.db import models
from customers.models import Customer

class BlogCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.CASCADE,
        related_name='blogs'
    )
    created_by = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
