import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { MembershipResolver } from './membership.resolver';
import { MembershipService } from './membership.service';
import { SubscriptionPlanEntity } from '../subscription-plan/entities/subscription-plan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipEntity, SubscriptionPlanEntity]),
  ],
  providers: [MembershipResolver, MembershipService],
})
export class MembershipModule {}
