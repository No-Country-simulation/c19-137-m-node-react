import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionResolver } from './subscription/subscription.resolver';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { User } from '../users/entities/user.entity';
import { MembershipEntity } from '../membership/entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity, User, MembershipEntity])],
  providers: [SubscriptionResolver, SubscriptionService]
})
export class SubscriptionModule {}
