import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface CreateMessageDto {
    roomId: string;
    content: string;
    senderId: string;
    senderRole: 'CLIENT' | 'LAWYER';
    senderName?: string;
    type?: 'TEXT' | 'FILE' | 'SYSTEM';
    fileName?: string;
    fileSize?: string;
    fileUrl?: string;
}

@Injectable()
export class ChatService {
    constructor() { }

    private mockRoom = {
        id: 'room-1',
        clientId: 'demo-user-id',
        isActive: true,
        lawyerName: 'Анна Сергеева',
        lawyerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
        lastMessageAt: new Date(),
        unreadByClient: 0,
        unreadByLawyer: 0,
        messages: [] as any[]
    };

    async getOrCreateRoom(clientId: string) {
        // Always return the mock room
        if (!this.mockRoom.messages.length) {
            this.mockRoom.messages.push({
                id: 'msg-1',
                roomId: 'room-1',
                content: 'Юрист скоро присоединится к чату',
                type: 'SYSTEM',
                senderId: 'system',
                senderRole: 'SYSTEM',
                createdAt: new Date(),
                isRead: true
            });
        }
        return this.mockRoom;
    }

    async getRoomById(roomId: string) {
        return this.mockRoom;
    }

    async getClientRooms(clientId: string) {
        return [this.mockRoom];
    }

    async sendMessage(dto: CreateMessageDto) {
        const message = {
            id: 'msg-' + randomUUID(),
            ...dto,
            type: dto.type || 'TEXT',
            createdAt: new Date(),
            isRead: false
        };
        this.mockRoom.messages.push(message);
        this.mockRoom.lastMessageAt = new Date();
        return message;
    }

    async markAsRead(roomId: string, role: 'CLIENT' | 'LAWYER') {
        this.mockRoom.unreadByClient = 0;
        return;
    }

    async getMessages(roomId: string, limit = 50, before?: string) {
        return this.mockRoom.messages;
    }
}
