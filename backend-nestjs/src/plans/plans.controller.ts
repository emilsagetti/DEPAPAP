import { Controller, Get, Logger } from '@nestjs/common';

interface PlanFeature {
    id: string;
    name: string;
    included: boolean;
}

interface Plan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: PlanFeature[];
    popular?: boolean;
}

@Controller('plans')
export class PlansController {
    private readonly logger = new Logger(PlansController.name);

    /**
     * GET /plans
     * Return available subscription plans
     */
    @Get()
    getPlans(): Plan[] {
        this.logger.log('GET /plans called');

        return [
            {
                id: 'starter',
                name: 'Стартовый',
                price: 15000,
                period: 'месяц',
                description: 'Для начинающих предпринимателей',
                features: [
                    { id: 'contracts', name: 'До 3 договоров в месяц', included: true },
                    { id: 'consultations', name: '2 консультации', included: true },
                    { id: 'documents', name: 'Шаблоны документов', included: true },
                    { id: 'support', name: 'Email поддержка', included: true },
                    { id: 'court', name: 'Судебное представительство', included: false },
                    { id: 'priority', name: 'Приоритетная обработка', included: false },
                ],
            },
            {
                id: 'optimum',
                name: 'Бизнес Оптимум',
                price: 45000,
                period: 'месяц',
                description: 'Для малого и среднего бизнеса',
                popular: true,
                features: [
                    { id: 'contracts', name: 'До 10 договоров в месяц', included: true },
                    { id: 'consultations', name: '5 консультаций', included: true },
                    { id: 'documents', name: 'Все шаблоны документов', included: true },
                    { id: 'support', name: 'Приоритетная поддержка', included: true },
                    { id: 'court', name: 'Судебное представительство', included: true },
                    { id: 'priority', name: 'Приоритетная обработка', included: false },
                ],
            },
            {
                id: 'enterprise',
                name: 'Корпоративный',
                price: 120000,
                period: 'месяц',
                description: 'Для крупного бизнеса',
                features: [
                    { id: 'contracts', name: 'Безлимитные договоры', included: true },
                    { id: 'consultations', name: 'Безлимитные консультации', included: true },
                    { id: 'documents', name: 'Все шаблоны + кастомные', included: true },
                    { id: 'support', name: 'Выделенный менеджер', included: true },
                    { id: 'court', name: 'Полное сопровождение в суде', included: true },
                    { id: 'priority', name: 'Приоритетная обработка 24/7', included: true },
                ],
            },
        ];
    }
}
