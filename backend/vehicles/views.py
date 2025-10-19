from django.contrib.auth import authenticate
from rest_framework import viewsets, filters, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Vehicle
from .serializers import VehicleSerializer


# ---------------------------
# Pagination for Vehicle List
# ---------------------------
class VehiclePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


# ---------------------------
# Vehicle CRUD ViewSet
# ---------------------------
class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all().order_by("-created_at")
    serializer_class = VehicleSerializer
    pagination_class = VehiclePagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["brand_name", "registration_number", "vehicle_name"]
    ordering_fields = ["brand_name", "created_at"]
    permission_classes = [IsAuthenticated, IsAdminUser]  # ✅ Only admins can access


# ---------------------------
# Admin Login
# ---------------------------
@api_view(["POST"])
def admin_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)

    if user and user.is_staff:
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "username": user.username,
                "message": "Admin login successful",
            }
        )
    return Response(
        {"error": "Invalid credentials or not admin"},
        status=status.HTTP_401_UNAUTHORIZED,
    )


# ---------------------------
# Admin Logout
# ---------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def admin_logout(request):
    request.user.auth_token.delete()
    return Response({"message": "Logout successful"})


# ---------------------------
# Admin Profile
# ---------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_profile(request):
    user = request.user
    return Response(
        {
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        }
    )
