import { Controller, Get, Query } from '@nestjs/common';
import { CabinetService } from './cabinet.service';

@Controller('cabinet')
export class CabinetController {
    constructor(private readonly cabinetService: CabinetService) { }

    @Get('dashboard')
    getDashboard() {
        return this.cabinetService.getDashboardStats();
    }

    @Get('requests')
    getRequests(@Query('limit') limit?: number, @Query('status') status?: string) {
        return this.cabinetService.getRequests(limit, status);
    }
}
