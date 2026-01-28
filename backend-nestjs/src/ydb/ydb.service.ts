import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Driver, getCredentialsFromEnv, getLogger } from 'ydb-sdk';

@Injectable()
export class YdbService implements OnModuleInit, OnModuleDestroy {
    private driver: Driver;
    private readonly logger = new Logger(YdbService.name);

    async onModuleInit() {
        const endpoint = process.env.YDB_ENDPOINT || 'grpc://localhost:2135';
        const database = process.env.YDB_DATABASE || '/local';

        this.logger.log(`Connecting to YDB at ${endpoint}, database: ${database}`);

        this.driver = new Driver({
            endpoint,
            database,
            authService: getCredentialsFromEnv(),
        });

        try {
            if (!await this.driver.ready(10000)) {
                this.logger.error('Driver failed to become ready within timeout');
            }
            this.logger.log('YDB Driver connected successfully');
        } catch (e) {
            this.logger.error('Failed to connect to YDB', e);
        }
    }

    async onModuleDestroy() {
        if (this.driver) {
            await this.driver.destroy();
        }
    }

    getDriver(): Driver {
        return this.driver;
    }
}
