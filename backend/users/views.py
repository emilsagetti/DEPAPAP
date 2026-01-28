from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer


class UserMeView(generics.RetrieveUpdateAPIView):
    """
    GET: Returns the current authenticated user's data
    PATCH: Updates the current user's profile
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileView(APIView):
    """
    Alternative endpoint for user profile data with additional info
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone': user.phone,
            'role': user.role,
            'role_display': user.get_role_display(),
            'date_joined': user.date_joined,
            'is_active': user.is_active,
        })
