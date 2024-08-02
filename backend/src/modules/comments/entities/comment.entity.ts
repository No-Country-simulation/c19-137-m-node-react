import {PostEntity} from 'src/modules/posts/entities/post.entity';
import {UserEntity} from 'src/modules/users/entities/user.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BookEntity} from "@/modules/books/entities/book.entity";

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column()
    datePosted: Date;

    @ManyToOne(() => PostEntity, (post) => post.comments)
    post: PostEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments)
    user: UserEntity;

    @ManyToOne(() => BookEntity, (book) => book.comments)
    book: BookEntity;
}
