import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { ReviewEntity } from 'src/modules/reviews/entities/reviews.entity';
import { SubscriptionPlanEntity } from '../../subscription-plan/entities/subscription-plan.entity';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @ManyToMany(() => BookEntity, (book) => book.users)
  @JoinTable()
  favorites: BookEntity[];

  @Column()
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({
    nullable: true,
  })
  role: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  enabled: boolean;

  @OneToMany(() => SubscriptionPlanEntity, (subscription) => subscription.user)
  subscriptions: SubscriptionPlanEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
