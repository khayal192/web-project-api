import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async findAll(userId: number) {
    return await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findById(id: number) {
    const findPost = await this.postsRepository.findOne({ where: { id } });
    if (!findPost) {
      throw new HttpException(
        `This users not find ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return findPost;
  }

  async createPosts(createPostsDto: CreatePostDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`USER NOT FOUND`);
    }

    const post = await this.postsRepository.create(createPostsDto);
    post.user = user;
    return this.postsRepository.save(post);
  }

  async updatePosts(
    dto: UpdatePostDto,
    postId: number,
    userId: number,
  ): Promise<any> {
    const post = await this.postsRepository.findOne({
      where: { id: postId, user: { id: userId } },
    });

    if (!post) {
      throw new NotFoundException(`POST NOT FOUND`);
    }

    post.title = dto.title;
    post.content = dto.content;

    return await this.postsRepository.save(post);
  }

  async deletePosts(postId: number, userId: number): Promise<void> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`POST NOT FOUND`);
    }

    if (post.user.id === userId) {
      await this.postsRepository.remove(post);
      return;
    }

    throw new BadRequestException(`USER IS NOT CREATOR POST`);
  }
}
