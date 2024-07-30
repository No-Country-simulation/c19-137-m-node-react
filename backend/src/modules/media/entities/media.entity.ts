import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';

@Entity()
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_name: string;

  @Column()
  hash_name: string;

  @Column()
  type: string;

  @Column()
  mime_type: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  base64: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.media)
  post: PostEntity;

  @CreateDateColumn()
  updatedAt: Date;
}
