import { Module } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [],
})
export class GrpcModule {}
