import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm/orm.config';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    DomainModule,
  ],
  providers: [],
  exports: [TypeOrmModule], // Export TypeOrmModule if other parts of the app need it
})
export class InfrastructureModule {}
