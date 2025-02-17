import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user-created.event';
import { UserUpdatedEvent } from '../user-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserCreatedEvent, UserUpdatedEvent)
export class UserEventHandler
  implements IEventHandler<UserCreatedEvent | UserUpdatedEvent>
{
  private readonly logger = new Logger(UserEventHandler.name);

  handle(event: UserCreatedEvent | UserUpdatedEvent) {
    if (event instanceof UserCreatedEvent) {
      this.logger.log(
        `New user created: ${event.user.name} (${event.user.email})`,
      );
      // Add other operations, such as sending emails or logging information
    } else if (event instanceof UserUpdatedEvent) {
      this.logger.log(`User updated: ${event.user.name} (${event.user.email})`);
      // Add other operations, such as sending emails or logging information
    }
  }
}
