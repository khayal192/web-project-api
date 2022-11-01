import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      UserEntity,
      CommentEntity,
      LikeEntity,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
