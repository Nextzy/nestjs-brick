import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserCommand } from './commands/create-user.command';
import { UpdateUserCommand } from './commands/update-user.command';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(command: CreateUserCommand): Promise<User> {
    const user = this.userRepository.create({
      name: command.name,
      email: command.email,
      password: command.password,
    });
    return this.userRepository.save(user);
  }

  async updateUser(command: UpdateUserCommand): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: command.id },
    });
    if (!user) return null;

    if (command.name) user.name = command.name;
    if (command.password) user.password = command.password;

    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
