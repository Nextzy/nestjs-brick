import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async execute(command: UpdateUserCommand): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: command.id } });
    if (!user) return null;

    if (command.name) user.name = command.name;
    if (command.password) user.password = command.password;

    return await this.userRepository.save(user);
  }
}
