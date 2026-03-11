{% extends 'base.html' %}
 {% load static %}
{% block content %}

    {% include "components/header/adminuiux-header.html" %}
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">

                <div class="adminuiux-wrap">

                    <!-- Standard sidebar -->
                     {% include "components/navigation/adminuiux-sidebar.html"  %}
                        <main class="adminuiux-content has-sidebar" onclick="contentClick()">
                                <div class="container mt-4">
                            <div class="card adminuiux-card mb-4">
                                <div class="card-header">
                                    <div class="row gx-3 gx-lg-4 align-items-center">
                                        <div class="col">
                                            <p class="h6">Bank Account List</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    
                                    <!-- data table -->
                                    <div class=" mb-4">
                                        <table class="table w-100 nowrap" id="account_dataTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th class="xs sm">Profile</th>
                                                     <th class="xs sm">A/C Type</th>
                                                    <th class="xs sm">A/C Number</th>
                                                    <th class="xs sm">Pin</th>
                                                    <th class="xs sm md">Request</th>
                                                    <th class="xs sm md">Balance</th>
                                                    {% comment %} <th class="xs sm">Tags</th>
                                                    <th class="all">Recent Schedule</th> {% endcomment %}
                                                    <th class="xs sm">Status</th>
                                                    <th class="all">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                        {% for account in accounts %}
                                                <tr>
                                                    <td>{{ account.id}}</td>
                                                    <td>
                                                        <div class="row align-items-center flex-nowrap">
                                                            <div class="col-auto">
                                                                <figure class="avatar avatar-40 mb-0 coverimg rounded-circle">
                                                                    <img src="{{ customer.avatar.url }}" alt="">
                                                                </figure>
                                                            </div>
                                                            <div class="col">
                                                                <p class="mb-0 fw-medium">{{customer.name}}</p>
                                                                <p class="text-secondary small">27 years, United Kingdom</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                     <td>
                                                        <p class="mb-0">{{ account.account_type}}</p>
                                                        <p class="text-secondary small"></p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0">{{ account.account_number}}</p>
                                                        <p class="text-secondary small"></p>
                                                    </td>
                                                    <td>
                                                        <p class="mb-0">{{ account.pin}}</p>
                                                        <p class="text-secondary small"></p>
                                                    </td>
                                                    <td>
                                                        <span class="badge badge-light rounded-pill text-bg-primary">{{ account.status}}</span>
                                                    </td>
                                                    <td>
                                                        <span class="badge badge-light rounded-pill text-bg-success">{{ account.balance}}</span>
                                                    </td>
                                                    
                                                    
                                                    <td>
                                                           {% if account.is_active %}
                                                            <span class="badge badge-light rounded-pill text-bg-success">Active</span>
                                                        {% else %}
                                                            <span class="badge badge-light rounded-pill text-bg-danger">Inactive</span>
                                                        {% endif %}
                                                    </td>
                                                    <td>
                                                        <a href="adminuiux-view-patient.html" class="btn btn-square btn-link" data-bs-toggle="tooltip" title="View">
                                                            <i class="bi bi-eye"></i>
                                                        </a>
                                                        {% comment %} <div class="dropdown d-inline-block">
                                                            <a class="btn btn-link no-caret" data-bs-toggle="dropdown">
                                                                <i class="bi bi-three-dots"></i>
                                                            </a>
                                                            <ul class="dropdown-menu dropdown-menu-end">
                                                                <li><a class="dropdown-item" href="javascript:void(0)">Edit</a></li>
                                                                <li><a class="dropdown-item" href="javascript:void(0)">Move</a></li>
                                                                <li><a class="dropdown-item theme-red" href="javascript:void(0)">Delete</a></li>
                                                            </ul>
                                                        </div> {% endcomment %}
                                                    </td>
                                                </tr>
                                               {% endfor %}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
              
                        </main>
                </div>
<script>
document.addEventListener("DOMContentLoaded", function () {
    if (!DataTable.isDataTable('#account_dataTable')) {
        new DataTable('#account_dataTable', {
            responsive: true,
            paging: true,
            searching: true,
            ordering: true,
            info: true
        });
    }
});
</script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>

<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
                <!-- notification -->
               {% include "components/offcanvas/notification.html"  %}
                <!-- themes -->
                {% include "components/offcanvas/theming.html"  %}
                <!-- footer -->
                {% comment %} {% include "components/footer/adminuiux-footer.html"  %} {% endcomment %}
 {% include "components/footer/adminuiux-auth-footer.html"  %}
{% endblock content %}