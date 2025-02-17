import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserCommand } from 'src/application/users/commands/create-user.command';
import { UpdateUserCommand } from 'src/application/users/commands/update-user.command';
import { CreateUserDto } from 'src/application/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/application/users/dto/update-user.dto';
import { UsersService } from 'src/application/users/users.service';

@Controller({ path: 'users', version: '1' }) // API v1
export class UsersV1Controller {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(createUserDto.name, createUserDto.email, createUserDto.password);
    return await this.usersService.createUser(command);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const command = new UpdateUserCommand(id, updateUserDto.name, updateUserDto.password);
    return await this.usersService.updateUser(command);
  }
}
