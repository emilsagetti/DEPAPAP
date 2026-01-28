import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TinkoffService } from './tinkoff.service';

@Module({
    imports: [HttpModule],
    providers: [TinkoffService],
    exports: [TinkoffService],
})
export class TinkoffModule { }
