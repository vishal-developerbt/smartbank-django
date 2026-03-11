import requests
import random
import logging
from django.utils.text import slugify
from blog.models import BlogCategory
from customers.models import Customer


# --- Setup logging ---
LOG_FILE = '/var/www/html/smartbank/cron_blog.log'

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


def my_scheduled_job():
    try:
        #category = BlogCategory.objects.first()
        category = BlogCategory.objects.filter(name="Health").first()
        customer = Customer.objects.first()

        if not category:
            logging.warning("No BlogCategory found, skipping blog creation.")
            return

        random_number = random.randint(1000, 9999)
        title = f"Blog Auto {random_number}"
        slug = slugify(title)

        payload = {
            "title": title,
            "slug": slug,
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "category": category.id,
            "created_by": customer.id if customer else None,
            "is_active": True
        }

        # API endpoint
        api_url = "http://127.0.0.1:8000/blog/api/blogs/create/"

        response = requests.post(api_url, json=payload, timeout=10)

        if response.status_code == 201:
            logging.info(f"Blog '{title}' created successfully via API. Response: {response.text}")
        else:
            logging.error(f"API error ({response.status_code}): {response.text}")

    except Exception as e:
        logging.exception(f"Cron job failed: {str(e)}")