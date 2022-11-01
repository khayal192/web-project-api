import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from '../user/dto/create.users.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() createUserDto: CreateUsersDto) {
    return await this.authService.registration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
}
