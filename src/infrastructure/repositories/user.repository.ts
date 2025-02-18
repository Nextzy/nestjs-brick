import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async update(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepo.delete(id);
    return result.affected > 0;
  }
}
