import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MembershipEntity } from '../../membership/entities/membership.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class SubscriptionPlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  membershipId: string;

  @ManyToOne(() => MembershipEntity, (membership) => membership.subscriptions)
  membership: MembershipEntity;

  @ManyToOne(() => UserEntity, (User) => User.subscriptions)
  user: UserEntity;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
