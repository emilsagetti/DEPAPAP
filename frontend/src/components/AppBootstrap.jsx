import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import PremiumLoader from './common/PremiumLoader';

const AppBootstrap = ({ children }) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <PremiumLoader fullScreen={true} text="Загрузка системы..." />;
    }

    return <>{children}</>;
};

export default AppBootstrap;
