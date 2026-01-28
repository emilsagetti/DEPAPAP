import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protected route component that checks for specific roles
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} props.allowedRoles - Array of allowed roles
 * @param {string} props.redirectTo - Redirect path if not authorized
 */
const RoleProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/auth' }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show nothing while loading
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Check role access
    const userRole = user?.role || 'client';

    // Director has access to everything
    if (userRole === 'director') {
        return children;
    }

    // Check if user's role is in allowed roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        const roleRedirects = {
            client: '/dashboard',
            lawyer: '/lawyer',
            admin: '/admin',
            content_manager: '/cms',
            director: '/director',
        };
        return <Navigate to={roleRedirects[userRole] || '/dashboard'} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
