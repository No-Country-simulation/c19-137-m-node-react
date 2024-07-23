import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MembershipEntity } from '../../membership/entities/membership.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  membershipId: string;

  @ManyToOne(() => MembershipEntity, membership => membership.subscriptions)
  membership: MembershipEntity;

  @ManyToOne(() => User, User => User.subscriptions)
  user: User;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}