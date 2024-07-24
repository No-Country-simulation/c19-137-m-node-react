import { Book } from 'src/modules/books/entities/book.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column('decimal', { precision: 6, scale: 1 })
  rating: number;

  @Column()
  date_posted: Date;

  @ManyToOne(() => Book, (book) => book.reviews)
  book: Book;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
