import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUser } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return JSON.stringify({ test: 'ABC' });
  }
  @Post()
  async createUser(@Body() createUser: CreateUser) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
