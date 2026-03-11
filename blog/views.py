from django.shortcuts import render, get_object_or_404
from django.views import View
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Blog, BlogCategory
from .serializers import BlogSerializer



class BlogListPageView(View):

    def get(self, request):
        categories = BlogCategory.objects.filter(is_active=True)
        blogs = Blog.objects.filter(is_active=True)

        # return render(request, 'blog_list.html', {
        #     'blogs': blogs,
        #     'categories': categories,
        #     'selected_category': None
        paginator = Paginator(blogs, 6)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        return render(request, 'blog_list.html', {
            'blogs': page_obj,  # paginated object
            'categories': categories,
            'selected_category': None
        })

class BlogDetailPageView(View):

    def get(self, request, slug):
        blog = get_object_or_404(Blog, slug=slug)

        return render(request, 'blog_detail_page.html', {
            'blog': blog
        })

class BlogByCategoryView(View):

    def get(self, request, slug):
        categories = BlogCategory.objects.filter(is_active=True)
        category = get_object_or_404(BlogCategory, slug=slug)

        blogs = Blog.objects.filter(
            category=category,
            is_active=True
        )

        # return render(request, 'blog_list.html', {
        #     'blogs': blogs,
        #     'categories': categories,
        #     'selected_category': slug
        paginator = Paginator(blogs, 6)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        return render(request, 'blog_list.html', {
            'blogs': page_obj,  # paginated object
            'categories': categories,
            'selected_category': slug
        })


class BlogDetailAPI(APIView):

    def get(self, request, id):
        blog = get_object_or_404(Blog, id=id)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)


class BlogListAPI(APIView):

    def get(self, request):
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)


class BlogCreateAPI(APIView):

    def post(self, request):
        serializer = BlogSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class BlogUpdateAPI(APIView):

    def put(self, request, id):
        blog = get_object_or_404(Blog, id=id)
        serializer = BlogSerializer(blog, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class BlogDeleteAPI(APIView):

    def delete(self, request, id):
        blog = get_object_or_404(Blog, id=id)
        blog.delete()

        return Response(
            {"message": "Blog deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
