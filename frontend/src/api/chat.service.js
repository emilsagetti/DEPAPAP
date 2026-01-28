import axiosInstance from './axios';

const ChatService = {
    async getThreads() {
        const response = await axiosInstance.get('/cabinet/threads/');
        return response.data;
    },

    async getThread(id) {
        const response = await axiosInstance.get(`/cabinet/threads/${id}/`);
        return response.data;
    },

    async createThread(subject, initialMessage) {
        const response = await axiosInstance.post('/cabinet/threads/', { subject });
        if (initialMessage) {
            await this.sendMessage(response.data.id, initialMessage);
        }
        return response.data;
    },

    async getMessages(threadId) {
        const response = await axiosInstance.get(`/cabinet/threads/${threadId}/messages/`);
        return response.data;
    },

    async sendMessage(threadId, text, files = []) {
        // TODO: Handle file attachments for messages if backend supports it
        const response = await axiosInstance.post(`/cabinet/threads/${threadId}/add_message/`, { text });
        return response.data;
    }
};

export default ChatService;
