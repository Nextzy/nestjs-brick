import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../../domain/entities/user.entity';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    return await this.userRepository.findById(query.id);
  }
}
