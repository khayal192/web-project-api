import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';

@Entity('like')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.like, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.like, {
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
