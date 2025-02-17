import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { UsersV2Controller } from './users.controller';

@Module({
  imports: [
    ApplicationModule,
  ],
  controllers: [
    UsersV2Controller,
  ],
})
export class V2Module {}
