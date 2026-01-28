import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/orders/');
            setOrders(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err.response?.data?.detail || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        try {
            const response = await axiosInstance.post('/orders/', orderData);
            setOrders(prevOrders => [response.data, ...prevOrders]);
            return { success: true, data: response.data };
        } catch (err) {
            console.error('Error creating order:', err);
            return {
                success: false,
                error: err.response?.data || 'Failed to create order',
            };
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
    };
};
