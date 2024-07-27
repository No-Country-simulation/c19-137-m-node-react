import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubscriptionPlanEntity } from '../../subscription-plan/entities/subscription-plan.entity';

@Entity()
export class MembershipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  duration: number;

  @OneToMany(
    () => SubscriptionPlanEntity,
    (subscription) => subscription.membership,
  )
  subscriptions: SubscriptionPlanEntity[];
}
