import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SubscriptionGuard = () => {
    const { user } = useAuth();

    // Mock subscription check - assume if user has no 'subscription_status' field, they are inactive. 
    // In real app this comes from user object.
    // Check local storage or user object structure
    const status = user?.subscription_status || user?.company?.subscription?.status;
    const isActive = status === 'active';

    if (!isActive) {
        return <Navigate to="/cabinet/tariff" replace />;
    }

    return <Outlet />;
};

export default SubscriptionGuard;
