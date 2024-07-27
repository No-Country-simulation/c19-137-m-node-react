import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column()
  created_at: Date;
}
