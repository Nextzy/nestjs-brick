import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../../domain/entities/user.entity';
import { GetAllUsersQuery } from './get-all-users.query';
import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetAllUsersQuery): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
