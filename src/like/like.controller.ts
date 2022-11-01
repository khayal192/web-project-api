import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { CurrentUser } from '../auth/user.decorarator';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likePost(@CurrentUser() user, @Body() likeDto: LikeDto) {
    return this.likeService.likePost(user.userId, likeDto);
  }
}
