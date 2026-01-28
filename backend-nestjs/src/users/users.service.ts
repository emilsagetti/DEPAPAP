import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor() { }

    private mockUser = {
        id: 'demo-user-id',
        email: 'demo@baa-legal.ru',
        firstName: 'Александр',
        lastName: 'Иванов',
        phone: '+79998887766',
        companyName: 'ООО «ТехноГрупп»',
        inn: '7700112233',
        subscriptionStatus: 'ACTIVE',
        subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
    };

    async findById(id: string) {
        // Return mock user for any ID for now
        if (id === 'demo-user-id' || true) {
             return this.mockUser;
        }
        throw new NotFoundException('User not found');
    }

    async findByEmail(email: string) {
        if (email === 'demo@baa-legal.ru') {
            return this.mockUser;
        }
        return null;
    }

    async updateProfile(userId: string, data: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        companyName?: string;
        inn?: string;
    }) {
        Object.assign(this.mockUser, data);
        return this.mockUser;
    }
}
