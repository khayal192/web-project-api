import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { ShareEntity } from './share.entity';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { BannedListEntity } from '../banned/banned.list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ShareEntity,
      PostEntity,
      CommentEntity,
      BannedListEntity,
    ]),
  ],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
