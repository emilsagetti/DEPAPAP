import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001/chat';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const socketRef = useRef(null);
    const userIdRef = useRef(null);
    const connectedRef = useRef(false);

    const [state, setState] = useState({
        isConnected: false,
        isConnecting: false,
        roomId: null,
        messages: [],
        lawyer: null,
        isTyping: false,
        typingName: null,
        error: null
    });

    // Initialize connection
    const connect = useCallback((userId) => {
        // Prevent duplicate connections
        if (!userId || connectedRef.current || socketRef.current?.connected) {
            return;
        }

        userIdRef.current = userId;
        connectedRef.current = true;
        setState(prev => ({ ...prev, isConnecting: true }));

        const socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Chat socket connected');
            setState(prev => ({ ...prev, isConnected: true, isConnecting: false }));
            socket.emit('joinRoom', { clientId: String(userId) });
        });

        socket.on('disconnect', () => {
            console.log('Chat socket disconnected');
            setState(prev => ({ ...prev, isConnected: false }));
            connectedRef.current = false;
        });

        socket.on('connect_error', (error) => {
            console.error('Chat connection error:', error);
            setState(prev => ({
                ...prev,
                isConnecting: false,
                error: 'Не удалось подключиться к чату'
            }));
            connectedRef.current = false;
        });

        socket.on('roomJoined', (data) => {
            console.log('Room joined:', data.roomId, 'messages:', data.messages?.length);
            setState(prev => ({
                ...prev,
                roomId: data.roomId,
                messages: data.messages || [],
                lawyer: data.lawyer
            }));
        });

        socket.on('newMessage', (message) => {
            console.log('New message received:', message);
            setState(prev => ({
                ...prev,
                messages: [...prev.messages, message]
            }));
        });

        socket.on('userTyping', (data) => {
            setState(prev => ({
                ...prev,
                isTyping: data.isTyping,
                typingName: data.isTyping ? data.name : null
            }));
        });
    }, []);

    // Send message
    const sendMessage = useCallback((content, senderName) => {
        if (!socketRef.current || !state.roomId || !userIdRef.current) {
            console.log('Cannot send message - not connected', {
                socket: !!socketRef.current,
                roomId: state.roomId,
                userId: userIdRef.current
            });
            return;
        }

        console.log('Sending message:', content);
        socketRef.current.emit('sendMessage', {
            roomId: state.roomId,
            content,
            senderId: String(userIdRef.current),
            senderRole: 'CLIENT',
            senderName,
            type: 'TEXT'
        });
    }, [state.roomId]);

    // Send typing indicator
    const sendTyping = useCallback((isTyping, name) => {
        if (!socketRef.current || !state.roomId) return;

        socketRef.current.emit('typing', {
            roomId: state.roomId,
            isTyping,
            name
        });
    }, [state.roomId]);

    // Mark as read
    const markAsRead = useCallback(() => {
        if (!socketRef.current || !state.roomId) return;

        socketRef.current.emit('markAsRead', {
            roomId: state.roomId,
            role: 'CLIENT'
        });
    }, [state.roomId]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                connectedRef.current = false;
            }
        };
    }, []);

    const value = {
        ...state,
        connect,
        sendMessage,
        sendTyping,
        markAsRead
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat(userId) {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }

    // Auto-connect when userId is provided
    useEffect(() => {
        if (userId && context.connect) {
            context.connect(userId);
        }
    }, [userId]); // Only depend on userId, not context.connect

    return context;
}

export default useChat;
