import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    author: string

    @Column('decimal', {precision: 6, scale: 1})
    rating: number

    @ManyToMany(() => User, (user) => user.favorites)
    users: User[]
}