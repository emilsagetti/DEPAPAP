import { Controller, Get, Patch, Body, Param, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    /**
     * GET /users/me
     * Get current user profile
     * Note: In production, extract userId from JWT token
     */
    @Get('me')
    async getMe() {
        // TODO: Replace with actual JWT extraction
        // For now, return first user from DB for demo purposes
        this.logger.log('GET /users/me called');

        // This is a placeholder - in production use JWT guard
        const demoUserId = 'demo-user-id'; // Will be replaced with seed data

        try {
            return await this.usersService.findById(demoUserId);
        } catch {
            return {
                id: 'demo',
                email: 'demo@baa-legal.ru',
                firstName: 'Александр',
                lastName: 'Иванов',
                companyName: 'ООО «ТехноГрупп»',
                subscriptionStatus: 'ACTIVE',
                subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            };
        }
    }

    /**
     * GET /users/:id
     * Get user by ID
     */
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.usersService.findById(id);
    }

    /**
     * PATCH /users/:id
     * Update user profile
     */
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() data: {
            firstName?: string;
            lastName?: string;
            phone?: string;
            companyName?: string;
            inn?: string;
        },
    ) {
        return await this.usersService.updateProfile(id, data);
    }
}
