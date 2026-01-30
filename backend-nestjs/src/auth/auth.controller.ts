import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('jwt/create')
    async login(@Body() body: any) {
        return {
            access: 'fake-jwt-token-access',
            refresh: 'fake-jwt-token-refresh'
        };
    }

    @Get('users') // Mocking /api/auth/users/ if that's what user requested, though likely it's a list or user info
    async getUsers() {
        return [{ id: 'demo-id', email: 'demo@baa-legal.ru' }];
    }

    @Post('users') // Registration
    async register(@Body() body: any) {
        return {
            id: 'new-user-id',
            ...body
        };
    }

    @Get('users/me')
    async getMe() {
        return {
            id: 'current-user-id',
            email: 'demo@baa-legal.ru',
            first_name: 'Demo',
            last_name: 'User',
            phone: '+79990000000',
            company_name: 'LLC Demo',
            subscription_status: 'active',
            role: 'client'
        };
    }
}
