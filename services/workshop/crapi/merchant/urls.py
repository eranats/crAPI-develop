#
# Licensed under the Apache License, Version 2.0 (the “License”);
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an “AS IS” BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


"""
merchant URL Configuration
The `urlpatterns` list routes URLs to views.
"""
from django.urls import include, re_path

import crapi.merchant.views as merchant_views

urlpatterns = [
    re_path(r"contact_mechanic$", merchant_views.ContactMechanicView.as_view()),
    re_path(
        r"service_requests/(?P<vin>[^/]+)$",
        merchant_views.UserServiceRequestsView.as_view(),
    ),
]
