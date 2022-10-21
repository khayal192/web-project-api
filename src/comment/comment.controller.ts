import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CurrentUser } from '../auth/user.decorarator';
import { CreateCommentDto } from './dto/create.comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllComments() {
    return await this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPosts(
    @CurrentUser() user,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(createCommentDto, user.userId);
  }
}
