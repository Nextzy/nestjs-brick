import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcModule } from './interfaces/grpc/grpc.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

dotenv.config(); // Load environment variables

async function bootstrap() {
  // Start REST API
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI, // Use /v1, /v2 in URL
  });

  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'X-API-Version',
  // });

  await app.listen(process.env.PORT ?? 3000);

  // Start gRPC Service
  const HOST = process.env.HOST || 'localhost';
  const GRPC_PORT = process.env.GRPC_PORT || '6565';

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join('./proto/user.proto'),
      url: `${HOST}:${GRPC_PORT}`
    },
  });

  await grpcApp.listen();
  console.log(`🚀 gRPC Service is running...`);
}
bootstrap();
