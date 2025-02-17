import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'users', version: '1' }) // API v1
export class UsersV1Controller {
  @Get()
  getUsersV1() {
    return { message: 'User list from v1' };
  }
}
