from django.urls import path
from blog import views as b_views
# from blog.views import BlogViewSet
# from rest_framework.routers import DefaultRouter
# # import your view

# router =DefaultRouter()
# router.register(r'blog',BlogViewSet,basename='blog')


urlpatterns = [

    path('', b_views.BlogListPageView.as_view(), name="blog_list_page"),
    path('blog/<slug:slug>/', b_views.BlogDetailPageView.as_view(), name="blog_detail_page"),
    path('category/<slug:slug>/', b_views.BlogByCategoryView.as_view(), name='blog_by_category'),

    # API URLs
    path('api/blogs/', b_views.BlogListAPI.as_view(), name="blog_list_api"),
    path('api/blogs/<int:id>/', b_views.BlogDetailAPI.as_view(), name="blog_details_by_id"),
    path('api/blogs/create/', b_views.BlogCreateAPI.as_view(), name='blog_create_api'),
    path('api/blogs/update/<int:id>/', b_views.BlogUpdateAPI.as_view(), name='blog_update_api'),
    path('api/blogs/delete/<int:id>/', b_views.BlogDeleteAPI.as_view(), name='blog_delete_api'),
]

# urlpatterns = [
#     path('', b_views.blog_list_page, name="blog_list_page"),
#     path('<str:slug>/', b_views.blog_detail_page, name="blog_detail_page"),
#     path('category/<str:slug>/',b_views.blog_by_category, name='blog_by_category'),

#     path('api/blogs/<int:id>/', b_views.blog_details_by_id, name="blog_details_by_id"),
#     path('api/blogs', b_views.blog_list_api, name="blog_list_api"),
#     path('api/blogs/create/', b_views.blog_create_api, name='blog_create_api'),
#     path('api/blogs/update/<int:id>/', b_views.blog_update_api, name='blog_update_api'),
#     path('api/blogs/delete/<int:id>/', b_views.blog_delete_api, name='blog_delete_api'),
# ]
