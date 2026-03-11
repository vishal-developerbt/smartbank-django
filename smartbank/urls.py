
from django.contrib import admin
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

# import your view
# def custom_404(request, exception):
#     return render(request, '404.html', status=404)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("dashboard.urls")), 
    path('customer/', include("customers.urls")), 
    path('blog/', include('blog.urls')),
    path('account/', include('accounts.urls')),
]

# handler404 = custom_404
# 🔥 THIS LINE IS REQUIRED
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )