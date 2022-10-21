import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { CreateCommentDto } from './dto/create.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findAll() {
    return await this.commentRepository.find();
  }

  async createComment(createCommentDto: CreateCommentDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`USER NOT FOUND`);
    }
    const post = await this.postRepository.findOne({
      where: { id: userId },
    });
    if (!post) {
      throw new HttpException('POST NOT FOUND', HttpStatus.NOT_FOUND);
    }

    if (post.id === post.id) {
      const comment = new CommentEntity();
      comment.user = user;
      comment.body = createCommentDto.text;
      comment.post = post;

      const newComment = await this.commentRepository.save(comment);
      const { ...commentResponse } = newComment;
      return commentResponse;
    }
  }
}
