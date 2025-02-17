import { Module } from '@nestjs/common';
import { UsersV1Controller } from './users.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [
    ApplicationModule,
  ],
  controllers: [
    UsersV1Controller,
  ],
})
export class V1Module {}
