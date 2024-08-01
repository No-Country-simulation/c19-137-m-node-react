import {UserEntity} from 'src/modules/users/entities/user.entity';
import {AuthorEntity} from 'src/modules/authors/entities/authors.entity';
import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ReviewEntity} from 'src/modules/reviews/entities/reviews.entity';
import {CommentEntity} from "@/modules/comments/entities/comment.entity";

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    published_date: Date;

    @ManyToOne(() => AuthorEntity, (author) => author.books)
    author: AuthorEntity;

    @Column('decimal', {precision: 6, scale: 1})
    rating: number;

    @Column()
    genre: string;

    @ManyToMany(() => UserEntity, (user) => user.favorites)
    users: UserEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.book)
    reviews: ReviewEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.book)
    comments: CommentEntity[];

}
