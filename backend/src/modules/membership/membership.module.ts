import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from '../membership/entities/membership.entity';
import { MembershipResolver } from './membership/membership.resolver';
import { MembershipService } from './membership/membership.service';
import { SubscriptionEntity } from '../subscription/entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity, SubscriptionEntity])],
  providers: [MembershipResolver, MembershipService]
})
export class MembershipModule {}
