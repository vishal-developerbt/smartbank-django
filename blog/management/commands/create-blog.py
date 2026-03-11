from django.core.management.base import BaseCommand
from blog.models import Blog, BlogCategory, Customer  # import your models

class Command(BaseCommand):
    help = 'Creates a dummy post with given title and slug'

    def add_arguments(self, parser):
        parser.add_argument('--title', type=str, required=True, help='Title of the post')
        parser.add_argument('--slug', type=str, required=True, help='Slug for the post')
        parser.add_argument('--category-id', type=int, required=True, help='ID of the category')
        parser.add_argument('--customer-id', type=int, required=False, help='ID of the customer')

    def handle(self, *args, **options):
        title = options['title']
        slug = options['slug']
        category_id = options['category_id']
        customer_id = options.get('customer_id')

        try:
            category = BlogCategory.objects.get(id=category_id)
        except Category.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'Category with id {category_id} does not exist'))
            return

        customer = None
        if customer_id:
            try:
                customer = Customer.objects.get(id=customer_id)
            except Customer.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Customer with id {customer_id} does not exist'))

        # Build the payload
        payload = {
            "title": title,
            "slug": slug,
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "category": category.id,
            "created_by": customer.id if customer else None,
            "is_active": True
        }

        # Create the Post object
        blog = Blog.objects.create(
            title=payload['title'],
            slug=payload['slug'],
            content=payload['content'],
            category=category,
            created_by=customer,
            is_active=payload['is_active']
        )

        self.stdout.write(self.style.SUCCESS(f"Blog '{blog.title}' created successfully!"))



# from django.core.management.base import BaseCommand

# class Command(BaseCommand):
#     help = 'Displays a friendly greeting'  # Shows when you run --help

#     def add_arguments(self, parser):
#         # Optional: Add arguments
#         parser.add_argument(
#             '--name', type=str, help='Name to greet', default='World'
#         )

#     def handle(self, *args, **options):
#         name = options['name']
#         self.stdout.write(self.style.SUCCESS(f'Hello, {name}!'))
