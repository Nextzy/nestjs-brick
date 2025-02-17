import { IEvent } from '@nestjs/cqrs';
import { User } from '../../../domain/entities/user.entity';

export class UserUpdatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}