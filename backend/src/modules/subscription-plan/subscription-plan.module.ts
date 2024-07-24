import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanResolver } from './subscription-plan.resolver';
import { SubscriptionPlanService } from './subscription-plan.service';
import { SubscriptionPlanEntity } from './entities/subscription-plan.entity';
import { UserEntity } from '../users/entities/user.entity';
import { MembershipEntity } from '../membership/entities/membership.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionPlanEntity, UserEntity, MembershipEntity]),
  ],
  providers: [SubscriptionPlanResolver, SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
