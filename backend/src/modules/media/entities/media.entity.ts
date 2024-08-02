import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {PostEntity} from '@/modules/posts/entities/post.entity';
import {Field, ObjectType} from '@nestjs/graphql';

@Entity()
@ObjectType() // Decorador de GraphQL para indicar que esta entidad es un tipo GraphQL
export class MediaEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String) // Decorador de GraphQL para exponer este campo
    id: string;

    @Column()
    @Field() // Decorador de GraphQL para exponer este campo
    fileName: string;

    @Column()
    @Field() // Decorador de GraphQL para exponer este campo
    hashName: string;

    @Column()
    @Field() // Decorador de GraphQL para exponer este campo
    type: string;

    @Column()
    @Field() // Decorador de GraphQL para exponer este campo
    mimeType: string;

    @Column()
    @Field(() => Number) // Decorador de GraphQL para exponer este campo
    size: number;

    @Column({nullable: true})
    @Field({nullable: true}) // Decorador de GraphQL para exponer este campo
    base64: string;

    @CreateDateColumn()
    @Field() // Decorador de GraphQL para exponer este campo
    createdAt: Date;

    @ManyToOne(() => PostEntity, (post) => post.media)
    @Field(() => PostEntity) // Decorador de GraphQL para exponer este campo
    post: PostEntity;

    @CreateDateColumn()
    @Field() // Decorador de GraphQL para exponer este campo
    updatedAt: Date;

    @Field() // Decorador de GraphQL para exponer el getter
    get url(): string {
        // Aquí defines la lógica para generar la URL, por ejemplo:
        return `${process.env.URL}/uploads/${this.hashName}`;
    }
}
