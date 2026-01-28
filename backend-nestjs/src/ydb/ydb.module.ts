import { Module, Global } from '@nestjs/common';
import { YdbService } from './ydb.service';

@Global()
@Module({
    providers: [YdbService],
    exports: [YdbService],
})
export class YdbModule { }
