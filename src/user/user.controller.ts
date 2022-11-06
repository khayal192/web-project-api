import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/user.decorarator';
import { UpdateUsersDto } from './dto/update.users.dto';

@ApiTags('user')
@Controller('user')
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

  @Delete(':id')
  async deletePosts(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  async updateUser(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUsersDto,
  ) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }
}
