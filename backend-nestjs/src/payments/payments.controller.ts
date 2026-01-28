import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { InitPaymentDto } from './dto/init-payment.dto';
import type { TinkoffWebhookPayload } from '../tinkoff/tinkoff.service';

interface InitPaymentResponse {
    paymentId: string;
    paymentUrl: string;
    orderId: string;
}

@Controller('payments')
export class PaymentsController {
    private readonly logger = new Logger(PaymentsController.name);

    constructor(private readonly paymentsService: PaymentsService) { }

    /**
     * POST /payments/init
     * Initialize a new payment and get redirect URL
     */
    @Post('init')
    async initPayment(@Body() dto: InitPaymentDto): Promise<InitPaymentResponse> {
        this.logger.log(`Init payment request: userId=${dto.userId}, amount=${dto.amount}`);

        const result = await this.paymentsService.initPayment(
            dto.userId,
            dto.amount,
            dto.method,
            dto.description,
            dto.successUrl,
            dto.failUrl,
        );

        return {
            paymentId: result.paymentId,
            paymentUrl: result.paymentUrl || '',
            orderId: result.orderId,
        };
    }

    /**
     * POST /payments/webhook
     * Tinkoff callback endpoint (PUBLIC - no auth required)
     * Must return 'OK' string on success
     */
    @Post('webhook')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(@Body() payload: Record<string, any>): Promise<string> {
        this.logger.log(`Webhook: OrderId=${payload.OrderId}, Status=${payload.Status}`);

        return await this.paymentsService.processWebhook(payload as TinkoffWebhookPayload);
    }

    /**
     * GET /payments/:id
     * Get payment details by ID
     */
    @Get(':id')
    async getPayment(@Param('id') id: string) {
        return await this.paymentsService.getPayment(id);
    }

    /**
     * GET /payments/user/:userId
     * Get user payment history
     */
    @Get('user/:userId')
    async getUserPayments(@Param('userId') userId: string) {
        return await this.paymentsService.getUserPayments(userId);
    }
}
