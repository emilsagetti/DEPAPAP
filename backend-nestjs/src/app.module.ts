import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TinkoffModule } from './tinkoff/tinkoff.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PlansModule } from './plans/plans.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { CabinetModule } from './cabinet/cabinet.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Features
    TinkoffModule,
    PaymentsModule,
    UsersModule,
    DashboardModule,
    PlansModule,
    ChatModule,
    AuthModule,
    CabinetModule,
  ],
})
export class AppModule { }
