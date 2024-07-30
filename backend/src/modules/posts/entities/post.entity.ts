import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';
import { MediaEntity } from '@/modules/media/entities/media.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  /**
   * Relacion con la entidad User  (1 a muchos)
   */
  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  /**
   * Relacion con la entidad Comment
   * (1 a muchos)
   * Un post puede tener muchos comentarios
   * Un comentario solo puede pertenecer a un post
   *
   * @docs https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining
   */
  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  /**
   * Relacion con la entidad Media
   * (1 a muchos)
   * Un post puede tener muchos media
   * Un media solo puede pertenecer a un post
   *
   * @docs https://typeorm.io/#/relations-faq/how-to-use-relation-id-without-joining
   */
  @OneToMany(() => MediaEntity, (media) => media.post)
  media: MediaEntity[];

  @CreateDateColumn()
  created_at: Date;
}
