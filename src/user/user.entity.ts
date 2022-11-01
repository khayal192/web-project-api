import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: '' })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user, {
    onDelete: 'CASCADE',
  })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  like: LikeEntity[];
}
