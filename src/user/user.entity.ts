import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from '../comment/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ default: '' })
  username: string;

  @ApiProperty()
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
}
