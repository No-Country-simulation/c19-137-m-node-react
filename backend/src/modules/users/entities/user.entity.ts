import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { Review } from 'src/modules/reviews/entities/reviews.entity';
import { SubscriptionPlanEntity } from '../../subscription-plan/entities/subscription-plan.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToMany(() => Book, (book) => book.users)
  @JoinTable()
  favorites: Book[];

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
}
