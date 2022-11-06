import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './like.entity';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';
import { ShareEntity } from '../share/share.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeEntity,
      PostEntity,
      CommentEntity,
      UserEntity,
      ShareEntity,
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
