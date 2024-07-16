import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PasswordResetToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @Column()
  expires_at: Date;

  @Column()
  created_at: Date;
}
