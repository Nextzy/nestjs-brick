import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../../domain/entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllUsersHandler } from './queries/get-all-users.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id.handler';
import { CreateUserHandler } from './commands/create-user.handler';
import { UpdateUserHandler } from './commands/update-user.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    UsersService,
    GetAllUsersHandler,
    GetUserByIdHandler,
    CreateUserHandler,
    UpdateUserHandler,
  ],
  exports: [UsersService],
})
export class UsersModule {}
