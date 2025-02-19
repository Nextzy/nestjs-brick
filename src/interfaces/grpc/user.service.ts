import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserResponse, GetUserRequest, CreateUserRequest } from './user.interface';

@Injectable()
export class UserService implements OnModuleInit {
  private users = new Map<string, UserResponse>();

  onModuleInit() {}

  async getUser(data: GetUserRequest): Promise<UserResponse> {
    return this.users.get(data.id) || null;
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const newUser: UserResponse = {
      id: Math.random().toString(36).substring(7),
      name: data.name,
      email: data.email,
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }
}
