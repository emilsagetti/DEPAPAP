import axiosInstance from './axios';

const CabinetService = {
    async getDashboardStats() {
        const response = await axiosInstance.get('/cabinet/dashboard/');
        return response.data;
    }
};

export default CabinetService;
