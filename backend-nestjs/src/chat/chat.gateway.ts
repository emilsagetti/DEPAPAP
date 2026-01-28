import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import type { CreateMessageDto } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
    },
    namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // Track connected users
    private connectedUsers = new Map<string, string>(); // socketId -> roomId

    constructor(private chatService: ChatService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedUsers.delete(client.id);
    }

    // Client joins their chat room
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @MessageBody() data: { clientId: string },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            // Get or create room for this client
            const room = await this.chatService.getOrCreateRoom(data.clientId);

            if (!room) {
                return { success: false, error: 'Could not create room' };
            }

            // Join the socket room
            client.join(room.id);
            this.connectedUsers.set(client.id, room.id);

            // Mark messages as read
            await this.chatService.markAsRead(room.id, 'CLIENT');

            // Send room data back to client
            client.emit('roomJoined', {
                roomId: room.id,
                messages: room.messages,
                lawyer: {
                    name: room.lawyerName,
                    avatar: room.lawyerAvatar,
                    online: true // Mock for now
                }
            });

            return { success: true, roomId: room.id };
        } catch (error: any) {
            console.error('Error joining room:', error);
            return { success: false, error: error.message };
        }
    }

    // Client sends a message
    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @MessageBody() data: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            // Save message to database
            const message = await this.chatService.sendMessage(data);

            // Broadcast to all clients in the room
            this.server.to(data.roomId).emit('newMessage', message);

            return { success: true, message };
        } catch (error: any) {
            console.error('Error sending message:', error);
            return { success: false, error: error.message };
        }
    }

    // Client marks messages as read
    @SubscribeMessage('markAsRead')
    async handleMarkAsRead(
        @MessageBody() data: { roomId: string; role: 'CLIENT' | 'LAWYER' },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            await this.chatService.markAsRead(data.roomId, data.role);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    // Get message history
    @SubscribeMessage('getHistory')
    async handleGetHistory(
        @MessageBody() data: { roomId: string; limit?: number; before?: string },
        @ConnectedSocket() client: Socket,
    ) {
        try {
            const messages = await this.chatService.getMessages(
                data.roomId,
                data.limit,
                data.before,
            );
            return { success: true, messages };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }

    // Typing indicator
    @SubscribeMessage('typing')
    handleTyping(
        @MessageBody() data: { roomId: string; isTyping: boolean; name: string },
        @ConnectedSocket() client: Socket,
    ) {
        // Broadcast typing status to room (except sender)
        client.to(data.roomId).emit('userTyping', {
            isTyping: data.isTyping,
            name: data.name,
        });
    }
}
