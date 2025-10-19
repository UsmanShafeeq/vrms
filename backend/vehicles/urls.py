from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, admin_login, admin_logout, admin_profile

router = DefaultRouter()
router.register(r"vehicles", VehicleViewSet, basename="vehicle")

urlpatterns = [
    path("", include(router.urls)),

    # Admin Authentication
    path("admin/login/", admin_login, name="admin_login"),
    path("admin/logout/", admin_logout, name="admin_logout"),
    path("admin/profile/", admin_profile, name="admin_profile"),
]
