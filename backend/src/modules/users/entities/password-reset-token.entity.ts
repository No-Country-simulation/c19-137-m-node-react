import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PasswordResetTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    userId: string;

    @Column()
    expiresAt: Date;

    @Column()
    createdAt: Date;
}
