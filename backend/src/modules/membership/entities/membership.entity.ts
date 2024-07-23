import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubscriptionEntity } from '../../subscription/entities/subscription.entity';

@Entity()
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  duration: string;

  @OneToMany(() => SubscriptionEntity, subscription => subscription.membership)
  subscriptions: SubscriptionEntity[];
}