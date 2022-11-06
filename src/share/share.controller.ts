import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShareService } from './share.service';
import { CurrentUser } from '../auth/user.decorarator';
import { CreateShareDto } from './dto/create-share.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async shared(@CurrentUser() user, @Body() dto: CreateShareDto) {
    return await this.shareService.shared(dto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteShare(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.shareService.deleteShared(user.userid, id);
  }
}
