import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PremiumLoader from './common/PremiumLoader';

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
    // Show nothing while loading
    if (isLoading) {
        return <PremiumLoader fullScreen={true} text="Проверка прав доступа..." />;
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

    // HOTFIX: Explicitly allow lawyer account
    if (user?.email === 'lawyer@depa.ai') {
        return children;
    }

    // Check if user's role is in allowed roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        const roleRedirects = {
            client: '/cabinet',
            lawyer: '/lawyer',
            admin: '/admin',
            content_manager: '/cms',
            director: '/director',
        };
        return <Navigate to={roleRedirects[userRole] || '/cabinet'} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
