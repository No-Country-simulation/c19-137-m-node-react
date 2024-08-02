import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {PostEntity} from 'src/modules/posts/entities/post.entity';
import {BookEntity} from 'src/modules/books/entities/book.entity';
import {ReviewEntity} from 'src/modules/reviews/entities/reviews.entity';
import {SubscriptionPlanEntity} from '../../subscription-plan/entities/subscription-plan.entity';
import {CommentEntity} from 'src/modules/comments/entities/comment.entity';
import {MediaEntity} from "@/modules/media/entities/media.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    nickName: string;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.user)
    reviews: ReviewEntity[];

    @ManyToMany(() => BookEntity, (book) => book.users)
    @JoinTable()
    favorites: BookEntity[];

    @ManyToMany(() => UserEntity, (user) => user.following)
    @JoinTable({
        name: 'user_following', // custom join table name
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'following_user_id',
            referencedColumnName: 'id'
        }
    })
    following: UserEntity[];

    @ManyToMany(() => UserEntity, (user) => user.followers)
    followers: UserEntity[];

    @Column()
    firstName: string;


    @Column({
        nullable: true,
    })
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({
        nullable: true,
    })
    age: number;

    @Column({
        nullable: true,
    })
    bio: string;

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


    @OneToOne(() => MediaEntity, {eager: true})
    @JoinColumn() // Asegúrate de usar @JoinColumn en relaciones OneToOne
    coverImage: MediaEntity;

    @OneToOne(() => MediaEntity, {eager: true})
    @JoinColumn() // Asegúrate de usar @JoinColumn en relaciones OneToOne
    profileImage: MediaEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
