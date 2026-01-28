import { Injectable, Logger } from '@nestjs/common';

export interface LawyerInfo {
    name: string;
    avatar?: string;
    isOnline: boolean;
}

@Injectable()
export class DashboardService {
    private readonly logger = new Logger(DashboardService.name);

    constructor() { }

    /**
     * Get dashboard summary for a user
     */
    async getSummary(userId: string) {
        // Mock active cases
        const activeCases = [
            {
                id: 'case-1',
                title: 'Налоговая проверка',
                progress: 45,
                category: 'Налоги',
                updatedAt: new Date(),
            },
            {
                id: 'case-2',
                title: 'Регистрация товарного знака',
                progress: 80,
                category: 'IP',
                updatedAt: new Date(Date.now() - 86400000),
            }
        ];

        // Mock recent documents
        const recentDocuments = [
            {
                id: 'doc-1',
                name: 'Договор поставки.docx',
                type: 'CONTRACT',
                status: 'DRAFT',
                category: 'Договоры',
                createdAt: new Date(),
            },
            {
                id: 'doc-2',
                name: 'Претензия.pdf',
                type: 'CLAIM',
                status: 'REVIEW',
                category: 'Споры',
                createdAt: new Date(Date.now() - 172800000),
            }
        ];

        // Mock stats
        const stats = {
            totalCases: 12,
            completedCases: 8,
            totalDocuments: 45,
            pendingPayments: 1,
        };

        // Mock lawyer info
        const lawyer: LawyerInfo = {
            name: 'Анна Смирнова',
            avatar: '/avatars/lawyer-1.jpg',
            isOnline: true,
        };

        return {
            activeCases,
            recentDocuments,
            stats,
            lawyer,
        };
    }

    /**
     * Get case statistics
     */
    async getCaseStats(userId: string) {
        return {
            'IN_PROGRESS': 2,
            'COMPLETED': 8,
            'NEW': 1,
        };
    }
}
