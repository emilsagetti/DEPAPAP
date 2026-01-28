import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { createHash } from 'crypto';
import { firstValueFrom } from 'rxjs';

// Tinkoff API Endpoints
const TINKOFF_API_URL = 'https://securepay.tinkoff.ru/v2';

// Response interfaces
export interface TinkoffInitResponse {
    Success: boolean;
    ErrorCode: string;
    TerminalKey: string;
    Status: string;
    PaymentId: string;
    OrderId: string;
    Amount: number;
    PaymentURL?: string;
    Message?: string;
    Details?: string;
}

export interface TinkoffWebhookPayload {
    TerminalKey: string;
    OrderId: string;
    Success: boolean;
    Status: string;
    PaymentId: number;
    ErrorCode: string;
    Amount: number;
    CardId?: number;
    Pan?: string;
    ExpDate?: string;
    Token?: string;
}

@Injectable()
export class TinkoffService {
    private readonly logger = new Logger(TinkoffService.name);
    private readonly terminalKey: string;
    private readonly password: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.terminalKey = this.configService.get<string>('TINKOFF_TERMINAL_KEY') || '';
        this.password = this.configService.get<string>('TINKOFF_PASSWORD') || '';

        if (!this.terminalKey || !this.password) {
            this.logger.warn('Tinkoff credentials not configured');
        }
    }

    /**
     * Generate Token (SHA-256 signature) for Tinkoff API
     * Algorithm:
     * 1. Add Password to params
     * 2. Remove Token and Receipt from params
     * 3. Sort keys alphabetically
     * 4. Concatenate all values
     * 5. Hash with SHA-256
     */
    generateToken(params: Record<string, any>): string {
        // Create a copy and add password
        const paramsWithPassword: Record<string, any> = {
            ...params,
            Password: this.password,
        };

        // Remove fields that shouldn't be included in token
        if ('Token' in paramsWithPassword) delete paramsWithPassword.Token;
        if ('Receipt' in paramsWithPassword) delete paramsWithPassword.Receipt;
        if ('DATA' in paramsWithPassword) delete paramsWithPassword.DATA;
        if ('Shops' in paramsWithPassword) delete paramsWithPassword.Shops;

        // Sort keys alphabetically and concatenate values
        const sortedKeys = Object.keys(paramsWithPassword).sort();
        const concatenated = sortedKeys.map(key => paramsWithPassword[key]).join('');

        // Generate SHA-256 hash
        const hash = createHash('sha256').update(concatenated).digest('hex');

        this.logger.debug(`Token generated for OrderId: ${params.OrderId || 'N/A'}`);
        return hash;
    }

    /**
     * Verify incoming webhook signature
     * Compares Token from request with computed token
     */
    verifySignature(payload: TinkoffWebhookPayload): boolean {
        const receivedToken = payload.Token;
        if (!receivedToken) return false;

        const payloadCopy: Record<string, any> = { ...payload };
        if ('Token' in payloadCopy) delete payloadCopy.Token;

        const computedToken = this.generateToken(payloadCopy);
        const isValid = receivedToken === computedToken;

        if (!isValid) {
            this.logger.warn(`Invalid signature for OrderId: ${payload.OrderId}`);
        }

        return isValid;
    }

    /**
     * Initialize payment with Tinkoff
     * Returns PaymentURL for client redirect
     */
    async initPayment(
        orderId: string,
        amount: number, // In kopecks
        description: string,
        successUrl?: string,
        failUrl?: string,
    ): Promise<TinkoffInitResponse> {
        const body: Record<string, any> = {
            TerminalKey: this.terminalKey,
            Amount: amount,
            OrderId: orderId,
            Description: description,
        };

        if (successUrl) body.SuccessURL = successUrl;
        if (failUrl) body.FailURL = failUrl;

        // Generate token
        body.Token = this.generateToken(body);

        this.logger.log(`Initiating payment: OrderId=${orderId}, Amount=${amount}`);

        try {
            // Check if credentials are set, otherwise return mock for dev
            if (!this.terminalKey || !this.password || this.terminalKey === 'your_terminal_key_here') {
                this.logger.warn('Tinkoff credentials invalid or missing. Using MOCK response.');
                return {
                    Success: true,
                    ErrorCode: '0',
                    TerminalKey: 'DEMO',
                    Status: 'NEW',
                    PaymentId: 'mock-' + orderId,
                    OrderId: orderId,
                    Amount: amount,
                    PaymentURL: successUrl || 'http://localhost:5173/cabinet?payment=success', // Auto-success for dev
                    Message: 'Mock Payment'
                };
            }

            const response = await firstValueFrom(
                this.httpService.post<TinkoffInitResponse>(`${TINKOFF_API_URL}/Init`, body),
            );

            const data = response.data;

            if (!data.Success) {
                this.logger.error(`Tinkoff Init failed: ${data.Message} (${data.ErrorCode})`);
                throw new HttpException(
                    data.Message || 'Payment initialization failed',
                    HttpStatus.BAD_REQUEST,
                );
            }

            this.logger.log(`Payment initialized: PaymentId=${data.PaymentId}`);
            return data;
        } catch (error: any) {
            this.logger.error(`Tinkoff API error details: ${error.response?.data ? JSON.stringify(error.response.data) : error.message}`);

            // Fallback for better DX locally - don't crash with 503 easily
            throw new HttpException(
                `Payment service error: ${error.message}`,
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    /**
     * Get payment status from Tinkoff
     */
    async getPaymentState(paymentId: string): Promise<any> {
        const body: Record<string, any> = {
            TerminalKey: this.terminalKey,
            PaymentId: paymentId,
        };

        body.Token = this.generateToken(body);

        try {
            const response = await firstValueFrom(
                this.httpService.post(`${TINKOFF_API_URL}/GetState`, body),
            );

            return response.data;
        } catch (error: any) {
            this.logger.error(`GetState error: ${error.message}`);
            throw new HttpException(
                'Failed to get payment state',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
