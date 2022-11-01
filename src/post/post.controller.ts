import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostEntity } from './post.entity';
import { CurrentUser } from '../auth/user.decorarator';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create Posts' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPosts(@CurrentUser() user, @Body() createPostDto: CreatePostDto) {
    return this.postService.createPosts(createPostDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find All Posts' })
  @Get('')
  async findAllPosts(@CurrentUser() user) {
    return await this.postService.findAll(user.userId);
  }

  @ApiOperation({ summary: 'Find by id posts' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PostEntity> {
    return this.postService.findById(id);
  }

  @ApiOperation({ summary: 'Update posts' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updatePosts(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePosts(updatePostDto, id, user.userId);
  }

  @ApiOperation({ summary: 'Delete by id posts' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePosts(
    @CurrentUser() user,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.postService.deletePosts(id, user.userId);
  }
}
