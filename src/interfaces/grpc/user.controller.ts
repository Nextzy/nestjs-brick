import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserRequest, GetUserRequest, UserResponse } from './user.interface';

@Controller()
export class UserController {
  constructor() {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<UserResponse> {
    return {id: request.id, name: "", email: ""};
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    return {id: "1", name: request.name, email: request.email};
  }
}
