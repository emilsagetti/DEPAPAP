import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { TinkoffService, TinkoffWebhookPayload } from '../tinkoff/tinkoff.service';
import { randomUUID } from 'crypto';

// Mock Enums
export enum PaymentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    REJECTED = 'REJECTED',
    CANCELED = 'CANCELED'
}

export enum PaymentMethod {
    CARD = 'CARD',
    INVOICE = 'INVOICE'
}

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);

    constructor(
        private readonly tinkoffService: TinkoffService,
    ) { }

    async initPayment(
        userId: string,
        amount: number, // In rubles
        method: PaymentMethod,
        description?: string,
        successUrl?: string,
        failUrl?: string,
    ) {
        // Generate unique order ID
        const orderId = `BAA-${Date.now()}-${randomUUID().slice(0, 8)}`;
        const amountKopecks = amount * 100;

        this.logger.log(`Initializing T-Bank payment for User ${userId}, OrderId: ${orderId}`);

        try {
            const payment = await this.tinkoffService.initPayment(
                orderId,
                amountKopecks,
                description || 'Payment',
                successUrl,
                failUrl
            );

            return {
                paymentId: payment.PaymentId,
                paymentUrl: payment.PaymentURL,
                orderId: payment.OrderId,
            };
        } catch (error) {
            this.logger.error(`Failed to init payment: ${error.message}`);
            throw error;
        }
    }

    async processWebhook(payload: TinkoffWebhookPayload): Promise<string> {
        const isValid = this.tinkoffService.verifySignature(payload);

        if (!isValid) {
            this.logger.error(`Invalid webhook signature for OrderId: ${payload.OrderId}`);
            throw new BadRequestException('Invalid signature');
        }

        this.logger.log(`Webhook Validated: OrderId=${payload.OrderId}, Status=${payload.Status}`);

        // TODO: Update payment status in database
        // await this.paymentRepository.updateStatus(payload.OrderId, payload.Status);

        return 'OK';
    }

    async getPayment(paymentId: string) {
        // Try to get status from T-Bank directly if DB is missing (or for demo)
        const state = await this.tinkoffService.getPaymentState(paymentId);
        return {
            id: paymentId,
            status: state.Status,
            amount: state.Amount / 100,
            userId: 'demo-user-id'
        };
    }

    async getUserPayments(userId: string) {
        return [
            {
                id: 'pay-1',
                amount: 500000, // 5000 rub
                status: PaymentStatus.CONFIRMED,
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                description: 'Подписка Pro'
            }
        ];
    }
}
