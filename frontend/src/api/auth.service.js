import axiosInstance from './axios';

const AuthService = {
    async login(email, password) {
        const response = await axiosInstance.post('/auth/jwt/create/', { email, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    },

    async register(userData) {
        const response = await axiosInstance.post('/auth/users/', userData);
        return response.data;
    },

    async getCurrentUser() {
        const response = await axiosInstance.get('/auth/users/me/');
        return response.data;
    },

    async refreshToken(refresh) {
        const response = await axiosInstance.post('/auth/jwt/refresh/', { refresh });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            // Some implementations rotate refresh tokens too
            if (response.data.refresh) {
                localStorage.setItem('refresh_token', response.data.refresh);
            }
        }
        return response.data;
    },

    async updateProfile(profileData) {
        // Djoser uses /users/me/ for patching user details
        const response = await axiosInstance.patch('/auth/users/me/', profileData);
        return response.data;
    },

    async setPassword(new_password, current_password) {
        const response = await axiosInstance.post('/auth/users/set_password/', { new_password, current_password });
        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

export default AuthService;
