import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'users', version: '2' }) // API v2
export class UsersV2Controller {
  @Get()
  getUsersV2() {
    return { message: 'User list from v2 with new features' };
  }
}