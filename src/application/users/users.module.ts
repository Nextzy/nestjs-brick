import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../../domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUsersHandler } from './queries/get-all-users.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';
import { UserEventHandler } from './events/handlers/user-event.handler';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule, InfrastructureModule],
  providers: [
    UsersService,
    GetAllUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
    UserEventHandler,
  ],
  exports: [UsersService],
})
export class UsersModule {}
