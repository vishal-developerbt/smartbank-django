from django.shortcuts import render

class UnderConstructionMiddleware:
    def __init__(self,get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # print("This is before view")
        response = self.get_response(request)
        # response= render(request, underc.html)
        print("This is after view")
        return response