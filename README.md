# SmartBank – Banking Management System

SmartBank is a Banking Management System built using **Django**.
The system helps manage customers, accounts, loans, and transactions in a structured way.

This project is designed for learning and practicing Django development, including authentication, database management, and banking workflows.

## System Architecture

SmartBank follows Django's MVT (Model View Template) architecture.

- **Models** → Database structure (customers, accounts, loans, transactions)
- **Views** → Business logic
- **Templates** → User interface
- **URLs** → Routing system

Database: PostgreSQL
Backend Framework: Django + Django REST Framework
Frontend: HTML, CSS, JavaScript

## Features
- User Registration and Login
- Customer Management
- Bank Account Management
- Loan Management
- Transaction Management
- Dashboard Overview
- Secure Authentication System
- Admin Panel for Management

## Project Structure

```
smartbank/
│
├── accounts/
│── customers/
│── dashboard/
│── loans/
│── transactions/
│
├── smartbank/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
|   └── wsgi.py
│
├── templates/
│   ├── app/
│   ├── base.html
|   ├── home.html
|   ├── register.html
│   └── login.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
|
├── venv/
|
├── requirements.txt
└── README.md
```

## Technologies Used
- Python
- Django
- HTML5
- Postgresql
- Smtp
- REST FRAMEWORK

## Installation

Clone the repository

    git clone https://github.com/vishal-developerbt/smartbank-django.git

Go to project folder

    cd smartbank-django

Create virtual environment

    python3 -m venv venv

Activate virtual environment

    source venv/bin/activate

Install dependencies

    pip install -r requirements.txt

Run migrations

    python manage.py migrate

Create admin user

    python manage.py createsuperuser

Run server

    python manage.py runserver