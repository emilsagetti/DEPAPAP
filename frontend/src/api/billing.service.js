import axios from './axios';

const BillingService = {
    getInvoices: async () => {
        const response = await axios.get('/cabinet/invoices/');
        return response.data;
    },

    getTransactions: async () => {
        // Assuming we have an endpoint for transactions
        // If not, we might need to rely on invoice history or create the endpoint
        // For now, let's try a standard endpoint pattern
        const response = await axios.get('/cabinet/transactions/');
        return response.data;
    },

    getBalance: async () => {
        // This might come from profile/company
        // Or a dedicated balance endpoint
        // Let's assume user profile or company has balance
        const response = await axios.get('/cabinet/billing/balance/');
        return response.data;
        // If 404, we'll handle gracefully
    }
};

export default BillingService;
