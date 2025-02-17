import { IEvent } from '@nestjs/cqrs';
import { User } from '../../../domain/entities/user.entity';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
