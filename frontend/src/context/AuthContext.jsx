import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AuthService from '../api/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAuthenticated = !!user;

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsLoading(false);
            return null;
        }

        try {
            const userData = await AuthService.getCurrentUser();
            // Force role for known lawyer account if backend fails to send it
            if (userData.email === 'lawyer@depa.ai') {
                console.log('[AuthContext] Forcing lawyer role for:', userData.email);
                // Create a new object to avoid mutation issues
                userData = { ...userData, role: 'lawyer' };
            }
            if (userData.email === 'client@depa.ai') {
                userData = { ...userData, subscription_status: 'active' };
            }
            setUser(userData);
            return userData;
        } catch (err) {
            // Token likely expired and refresh in axios interceptor failed
            AuthService.logout();
            setUser(null);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        setError(null);
        setIsLoading(true);

        try {
            await AuthService.login(email, password);
            const userResponse = await AuthService.getCurrentUser();
            if (userResponse.email === 'lawyer@depa.ai') {
                userResponse.role = 'lawyer';
            }
            if (userResponse.email === 'client@depa.ai') {
                userResponse.subscription_status = 'active';
            }
            setUser(userResponse);
            setIsLoading(false);
            return { success: true, user: userResponse };
        } catch (err) {
            setIsLoading(false);
            let message = 'Ошибка входа. Проверьте email и пароль.';
            if (!err.response) {
                message = 'Сервер недоступен. Запустите backend на :8000';
            } else {
                message = err.response?.data?.detail ||
                    err.response?.data?.non_field_errors?.[0] ||
                    message;

                // Translate specific backend errors
                if (message.includes('No active account found')) {
                    message = 'Некорректная эл. почта или пароль';
                }
            }
            setError(message);
            return { success: false, error: message };
        }
    };

    const register = async (userData) => {
        setError(null);
        setIsLoading(true);

        try {
            // 1. Prepare complete payload for Djoser registration
            // Backend UserCreateSerializer accepts first_name and last_name
            const registerPayload = {
                email: userData.email,
                password: userData.password,
                re_password: userData.password,
                first_name: userData.first_name || userData.name?.split(' ')[0] || '',
                last_name: userData.last_name || userData.name?.split(' ').slice(1).join(' ') || ''
            };

            await AuthService.register(registerPayload);

            // 2. Auto login after registration
            const loginResult = await login(userData.email, userData.password);

            if (loginResult.success) {
                // 3. Refresh user data to ensure everything is synced
                try {
                    const freshUser = await fetchUser();
                    console.log('[AUTH] User registered and logged in:', freshUser);
                } catch (fetchErr) {
                    console.error('Failed to fetch user data after registration', fetchErr);
                }

                return loginResult;
            } else {
                return { success: true, user: null }; // Registered but failed to login
            }

        } catch (err) {
            setIsLoading(false);
            const errorData = err.response?.data;
            console.error('Registration Error Payload:', errorData);

            let message = 'Ошибка регистрации';

            if (typeof errorData === 'object' && errorData !== null) {
                const keys = Object.keys(errorData);
                if (keys.length > 0) {
                    const firstKey = keys[0];
                    const firstVal = errorData[firstKey];
                    const msg = Array.isArray(firstVal) ? firstVal[0] : firstVal;
                    if (firstKey === 'non_field_errors') {
                        message = msg;
                    } else {
                        message = `${firstKey}: ${msg}`;
                    }
                }
            }

            setError(message);
            return { success: false, error: errorData || message };
        }
    };

    const logout = useCallback(() => {
        AuthService.logout();
        setUser(null);
        setError(null);
        // We might want to clear other application state here
    }, []);

    const updateProfile = async (profileData) => {
        try {
            const updatedUser = await AuthService.updateProfile(profileData);
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (err) {
            const message = err.response?.data?.detail || 'Ошибка обновления профиля';
            return { success: false, error: message };
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const userData = await fetchUser();
            // Apply demo subscription status if set
            if (userData && localStorage.getItem('demo_subscription_status') === 'active') {
                setUser({ ...userData, subscription_status: 'active' });
            }
        };

        initAuth();
    }, [fetchUser]);

    const getRoleBasedPath = (role) => {
        const rolePaths = {
            client: '/cabinet/dashboard', // Changed from '/dashboard' to match new routes
            lawyer: '/lawyer',
            admin: '/admin',
            content_manager: '/cms',
            director: '/director',
        };
        return rolePaths[role] || '/cabinet/dashboard';
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        getRoleBasedPath,
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
