import { Controller, Get, Query, Logger } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    private readonly logger = new Logger(DashboardController.name);

    constructor(private readonly dashboardService: DashboardService) { }

    /**
     * GET /dashboard/summary
     * Get dashboard summary with cases, documents, and stats
     */
    @Get('summary')
    async getSummary(@Query('userId') userId?: string) {
        this.logger.log(`GET /dashboard/summary for userId: ${userId || 'demo'}`);

        // TODO: In production, extract userId from JWT
        // For demo, use provided userId or fallback to demo data
        if (!userId) {
            return {
                activeCases: [
                    { id: '1', title: 'Регистрация ООО «Инновации»', progress: 65, category: 'Регистрация' },
                    { id: '2', title: 'Договор аренды офиса', progress: 90, category: 'Договоры' },
                    { id: '3', title: 'Защита товарного знака', progress: 30, category: 'Интеллектуальная собственность' },
                ],
                recentDocuments: [
                    { id: '1', name: 'Устав_ООО_Инновации.pdf', type: 'PDF', status: 'SIGNED', category: 'Договоры' },
                    { id: '2', name: 'Договор_аренды.pdf', type: 'PDF', status: 'REVIEW', category: 'Договоры' },
                    { id: '3', name: 'Заявление_ТЗ.doc', type: 'DOC', status: 'DRAFT', category: 'Судебные' },
                ],
                stats: {
                    totalCases: 12,
                    completedCases: 8,
                    totalDocuments: 47,
                    pendingPayments: 1,
                },
                lawyer: {
                    name: 'Анна Смирнова',
                    avatar: null,
                    isOnline: true,
                },
            };
        }

        return await this.dashboardService.getSummary(userId);
    }

    /**
     * GET /dashboard/stats
     * Get case statistics by status
     */
    @Get('stats')
    async getStats(@Query('userId') userId?: string) {
        if (!userId) {
            return {
                IN_PROGRESS: 4,
                COMPLETED: 8,
                ON_HOLD: 1,
            };
        }

        return await this.dashboardService.getCaseStats(userId);
    }
}
