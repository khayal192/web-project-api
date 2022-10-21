import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get(':id')
  async findUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.findById(id);
  }

  @Post('email')
  async findByEmail(email) {
    return this.usersService.findByEmail(email);
  }
}
