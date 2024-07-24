import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from 'src/modules/books/entities/book.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  bio: string;
  @Column()
  birth_date: Date;
  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
