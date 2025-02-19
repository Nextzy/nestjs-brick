import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserRequest, GetUserRequest, UserResponse } from './user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<UserResponse> {
    return this.userService.getUser(request);
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    return this.userService.createUser(request);
  }
}
