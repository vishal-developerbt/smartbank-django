{% extends 'base.html' %}
 {% load static %}
{% block content %}

    {% include "components/header/adminuiux-header.html" %}
        <div class="adminuiux-wrap">
                {% include "components/navigation/adminuiux-sidebar.html"  %}
                <main class="adminuiux-content has-sidebar" onclick="contentClick()">
                    <div class="container mt-4">
                        {% if messages %}
                            {% for message in messages %}
                                <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
                                    {{ message }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                </div>
                            {% endfor %}
                        {% endif %}
                        <div class="row">
                            <div class="col-md-3"> </div>
                            <div class="col-md-6">
                                <div class="card adminuiux-card mb-4">
                                    <div class="card-header">
                                        <div class="row gx-3 gx-lg-4 align-items-center">
                                            <div class="col">
                                                <p class="h6">Standard field Validation</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <form method="POST" action="{% url 'save_customer_account' %}"  class="row g-3 needs-validation was-validated">
                                            {% csrf_token %}
                                            <div class="col-12">
                                                <label for="validationCustom04" class="form-label">Account Type</label>
                                                <select name="account_type" class="form-select" id="validationCustom04" required>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option value="saving" >Saving Account</option>
                                                    <option value="current" >Current Account</option>
                                                    <option value="salary" >Salary Account</option>
                                                </select>
                                                <div class="invalid-feedback">
                                                    Please select a valid Account.
                                                </div>
                                                <div class="valid-feedback">
                                                    Looks good!
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-theme">Submit Request</button>

                                        </form>
                                    </div>
                                </div> 
                            </div>
                            <div class="col-md-3"> </div>
                        </div>
                    </div>
                </main>
        </div>

    <!-- notification -->
    {% include "components/offcanvas/notification.html" %}
    <!-- themes -->
    {% include "components/offcanvas/theming.html" %}
    <!-- footer -->
    {% comment %} {% include "components/footer/adminuiux-footer.html"  %} {% endcomment %}
    {% include "components/footer/adminuiux-auth-footer.html" %}
{% endblock content %}