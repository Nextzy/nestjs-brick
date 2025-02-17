import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { User } from 'src/domain/entities/user.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/get-all-users.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async getAllUsers() {
    return await this.queryBus.execute(new GetAllUsersQuery());
  }

  async createUser(command: CreateUserCommand) {
    return await this.commandBus.execute(command);
  }

  async updateUser(command: UpdateUserCommand) {
    return await this.commandBus.execute(command);
  }
}
