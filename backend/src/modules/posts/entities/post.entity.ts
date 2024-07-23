import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @Column()
    content: string

    @Column()
    created_at: Date
}
