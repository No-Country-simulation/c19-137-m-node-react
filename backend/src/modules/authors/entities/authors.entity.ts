import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/modules/books/entities/book.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    first_name: String
    @Column()
    last_name: String
    @Column()
    bio: String
    @Column()
    birth_date: Date
    @OneToMany(() => Book, (book) => book.author)
    books: Book[]
}