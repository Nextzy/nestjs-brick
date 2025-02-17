import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm/orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    // Other modules related to infrastructure (repositories, etc.)
  ],
  providers: [],
  exports: [TypeOrmModule], // Export TypeOrmModule if other parts of the app need it
})
export class InfrastructureModule {}
