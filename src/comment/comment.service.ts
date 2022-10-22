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
import { UpdateCommentDto } from './dto/update.comment.dto';
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

  async findAll(userId: number) {
    return await this.commentRepository.find({
      where: { user: { id: userId } },
      relations: ['post'],
    });
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment) {
      throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
    }
    if (comment.user.id === userId) {
      await this.commentRepository.remove(comment);
      return;
    }
    throw new HttpException(
      'User comment are not available',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateComment(
    userId: number,
    updateCommentDto: UpdateCommentDto,
    commentId: number,
  ): Promise<any> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });
    if (!comment) {
      throw new HttpException('COMMENT NOT FOUND', HttpStatus.NOT_FOUND);
    }
    comment.body = updateCommentDto.body;
    return await this.commentRepository.save(comment);
  }

  async createComment(createCommentDto: CreateCommentDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('USER NOT FOUND');
    }
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new NotFoundException('POST NOT FOUND');
    }

    const comment = new CommentEntity();
    comment.post = post;
    comment.user = user;
    comment.body = createCommentDto.body;
    const newComment = await this.commentRepository.save(comment);
    console.log('salam');
    const { user: commentUser, post: commentPost, ...response } = newComment;
    return response;
  }
}
