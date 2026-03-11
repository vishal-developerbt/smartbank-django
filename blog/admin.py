from django.contrib import admin
from .models import Blog
from .models import BlogCategory
from django.utils.html import format_html


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'is_active')
   
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_preview','title', 'slug','category', 'is_active','created_by')

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="80" height="80" style="object-fit:cover;" />',
                obj.image.url
            )
        return "No Image"