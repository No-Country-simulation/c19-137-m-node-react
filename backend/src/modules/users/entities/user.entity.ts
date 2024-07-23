import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Book } from 'src/modules/books/entities/book.entity';
import { Review } from 'src/modules/reviews/entities/reviews.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubscriptionEntity } from '../../subscription/entities/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

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

  @OneToMany(() => SubscriptionEntity, subscription => subscription.user)
  subscriptions: SubscriptionEntity[];
}
