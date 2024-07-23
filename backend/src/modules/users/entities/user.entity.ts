import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubscriptionEntity } from '../../subscription/entities/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  age: number;

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

  @OneToMany(() => SubscriptionEntity, subscription => subscription.user)
  subscriptions: SubscriptionEntity[];
}
