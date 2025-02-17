import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    InfrastructureModule, // Import the InfrastructureModule to make DB and other infrastructure available
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
