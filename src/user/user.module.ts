import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      CommentEntity,
      LikeEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
