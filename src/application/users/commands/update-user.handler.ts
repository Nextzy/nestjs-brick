import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../domain/entities/user.entity';
import { UpdateUserCommand } from './update-user.command';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { Inject } from '@nestjs/common';
import { HashUtil } from 'src/infrastructure/utils/hash.util';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User | null> {
    const user = await this.userRepository.findById(command.id);
    if (!user) return null;

    if (command.name) user.name = command.name;
    if (command.password) user.password = await HashUtil.hashPassword(command.password);

    return await this.userRepository.update(user);
  }
}
