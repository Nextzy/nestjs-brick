import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { User } from 'src/domain/entities/user.entity';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/get-all-users.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { UserCreatedEvent } from './events/user-created.event';
import { UserUpdatedEvent } from './events/user-updated.event';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  async getAllUsers() {
    return await this.queryBus.execute(new GetAllUsersQuery());
  }

  async createUser(command: CreateUserCommand) {
    const user = await this.commandBus.execute(command);
    this.eventBus.publish(new UserCreatedEvent(user));
    return user;
  }

  async updateUser(command: UpdateUserCommand) {
    const user = await this.commandBus.execute(command);
    this.eventBus.publish(new UserUpdatedEvent(user));
    return user;
  }
}
