import axios from 'axios';

const API_URL = '/api';

// Get auth token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Dashboard API
export const dashboardAPI = {
    // Get dashboard statistics
    getStats: async () => {
        const response = await axios.get(`${API_URL}/dashboard/stats/`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Get active cases
    getCases: async () => {
        const response = await axios.get(`${API_URL}/dashboard/cases/`, {
            headers: getAuthHeader()
        });
        return response.data;
    }
};

// Orders API
export const ordersAPI = {
    // Get all orders
    getAll: async () => {
        const response = await axios.get(`${API_URL}/orders/`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Get single order
    getById: async (id) => {
        const response = await axios.get(`${API_URL}/orders/${id}/`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Create new order
    create: async (orderData) => {
        const response = await axios.post(`${API_URL}/orders/`, orderData, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Update order
    update: async (id, orderData) => {
        const response = await axios.patch(`${API_URL}/orders/${id}/`, orderData, {
            headers: getAuthHeader()
        });
        return response.data;
    }
};

// User Profile API
export const userAPI = {
    // Get current user
    getMe: async () => {
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Update profile
    updateProfile: async (profileData) => {
        const response = await axios.patch(`${API_URL}/users/me/`, profileData, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Upload avatar
    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await axios.patch(`${API_URL}/users/me/`, formData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Change password
    changePassword: async (currentPassword, newPassword) => {
        const response = await axios.post(`${API_URL}/auth/users/set_password/`, {
            current_password: currentPassword,
            new_password: newPassword
        }, {
            headers: getAuthHeader()
        });
        return response.data;
    }
};

// Documents API (placeholder for future implementation)
export const documentsAPI = {
    getAll: async () => {
        // Placeholder - returns mock data until backend is implemented
        return [
            { id: 1, name: 'Устав ООО.pdf', status: 'ready', date: '10 янв', type: 'pdf' },
            { id: 2, name: 'Заявление Р11001.pdf', status: 'review', date: '9 янв', type: 'pdf' },
            { id: 3, name: 'Решение учредителя.docx', status: 'ready', date: '8 янв', type: 'doc' }
        ];
    }
};

export default {
    dashboard: dashboardAPI,
    orders: ordersAPI,
    user: userAPI,
    documents: documentsAPI
};
