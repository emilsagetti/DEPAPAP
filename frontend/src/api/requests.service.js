import axiosInstance from './axios';

const RequestsService = {
    async getAll(params = {}) {
        const response = await axiosInstance.get('/cabinet/requests/', { params });
        return response.data;
    },

    async getById(id) {
        const response = await axiosInstance.get(`/cabinet/requests/${id}/`);
        return response.data;
    },

    async create(data) {
        const response = await axiosInstance.post('/cabinet/requests/', data);
        return response.data;
    },

    async update(id, data) {
        const response = await axiosInstance.patch(`/cabinet/requests/${id}/`, data);
        return response.data;
    },

    async delete(id) {
        await axiosInstance.delete(`/cabinet/requests/${id}/`);
    }
};

export default RequestsService;
