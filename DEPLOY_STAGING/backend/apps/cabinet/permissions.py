from rest_framework import permissions

class IsOwnerOrCompany(permissions.BasePermission):
    """
    Object-level permission to only allow owners (or users in the same company) to access it.
    Assumes models have a 'company' field or 'user' field.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request type
        # but we also need to check filtering permissions
        
        # Superusers can see everything
        if request.user.is_superuser:
            return True
            
        # Check if obj has company
        if hasattr(obj, 'company'):
            return obj.company == request.user.company
            
        # Check if obj has user/created_by/uploaded_by
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'created_by'):
             return obj.created_by == request.user
        if hasattr(obj, 'uploaded_by'):
             return obj.uploaded_by == request.user
             
        return False
