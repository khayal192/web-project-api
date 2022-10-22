import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CurrentUser } from '../auth/user.decorarator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(
    @CurrentUser() user,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(
      createCommentDto,
      user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllComments(@CurrentUser() user) {
    return await this.commentService.findAll(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.commentService.deleteComment(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateComment(
    @CurrentUser() user,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.commentService.updateComment(
      user.userId,

      updateCommentDto,
      id,
    );
  }
}
