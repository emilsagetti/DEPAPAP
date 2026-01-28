import axiosInstance from './axios';

const DocsService = {
    async getAll(params = {}) {
        const response = await axiosInstance.get('/cabinet/documents/', { params });
        return response.data;
    },

    async upload(file, category, title) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);
        if (title) formData.append('title', title);

        const response = await axiosInstance.post('/cabinet/documents/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async delete(id) {
        await axiosInstance.delete(`/cabinet/documents/${id}/`);
    }
};

export default DocsService;
