import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BannedService } from './banned.service';
import { CurrentUser } from '../auth/user.decorarator';
import { CreateBannedDto } from './dto/create-banned.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('banned_user')
@Controller('banned')
export class BannedController {
  constructor(private readonly bannedService: BannedService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async banned(@CurrentUser() user, @Body() dto: CreateBannedDto) {
    return await this.bannedService.bannedUser(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.bannedService.deleteBanned(user.userId, id);
  }
}
