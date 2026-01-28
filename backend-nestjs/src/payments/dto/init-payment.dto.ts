import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum PaymentMethod {
    CARD = 'CARD',
    INVOICE = 'INVOICE'
}

export class InitPaymentDto {
    @IsString()
    userId: string;

    @IsNumber()
    amount: number; // In rubles (will be converted to kopecks)

    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    successUrl?: string;

    @IsString()
    @IsOptional()
    failUrl?: string;
}

export class InitPaymentResponseDto {
    paymentId: string;
    paymentUrl: string;
    orderId: string;
}
