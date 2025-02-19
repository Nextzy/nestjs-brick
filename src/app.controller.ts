import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataSource: DataSource
  ) {}

  @Get('health/liveness')
  checkLiveness(): string {
    return 'OK';
  }

  @Get('health/readiness')
  checkReadiness(): string {
    let dbConnected = true;
    if (!this.dataSource.isInitialized) {
        dbConnected = false;
    }
    return dbConnected ? 'OK' : 'NOT READY';
  }
}
