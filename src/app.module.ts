import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config/config';
import { V1Module } from './interfaces/http/v1/v1.module';
import { V2Module } from './interfaces/http/v2/v2.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { GrpcModule } from './interfaces/grpc/grpc.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    InfrastructureModule, // Import the InfrastructureModule to make DB and other infrastructure available
    V1Module,
    V2Module,
    GrpcModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Apply the logging interceptor globally
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: 'health/liveness', method: RequestMethod.GET },
      { path: 'health/readiness', method: RequestMethod.GET },
    ).forRoutes('*');
  }
}
