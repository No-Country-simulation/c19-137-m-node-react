import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Author } from 'src/modules/authors/entities/authors.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from 'src/modules/reviews/entities/reviews.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @Column('decimal', { precision: 6, scale: 1 })
  rating: number;

  @Column()
  genre: string;

  @ManyToMany(() => UserEntity, (user) => user.favorites)
  users: UserEntity[];

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
