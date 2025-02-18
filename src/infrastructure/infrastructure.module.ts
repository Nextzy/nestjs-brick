import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm/orm.config';
import { UserRepository } from './repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [TypeOrmModule, 'IUserRepository'], // Export TypeOrmModule if other parts of the app need it
})
export class InfrastructureModule {}
