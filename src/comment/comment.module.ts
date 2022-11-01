import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';
import { LikeEntity } from '../like/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      UserEntity,
      PostEntity,
      LikeEntity,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
