import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { CreateMembershipInput } from '../dto/create-membership.input';
import { UpdateMembershipInput } from '../dto/update-membership.input';
import { MembershipEntity } from '../../membership/entities/membership.entity';
import { SubscriptionEntity } from '../../subscription/entities/subscription.entity';

const pubSub = new PubSub();

@Injectable()
export class MembershipService {
    constructor(
        @InjectRepository(MembershipEntity)
        private membershipRepository: Repository<MembershipEntity>,
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
      ) {}
    
      async create(createMembershipInput: CreateMembershipInput): Promise<MembershipEntity> {
        const newMembership = this.membershipRepository.create(createMembershipInput);
        const savedMembership = await this.membershipRepository.save(newMembership);
        await pubSub.publish('onMembershipCreated', { onMembershipCreated: savedMembership });
        return savedMembership;
      }
    
      async findAll(): Promise<MembershipEntity[]> {
        return this.membershipRepository.find();
      }
    
      async findOne(id: string): Promise<MembershipEntity> {
        return this.membershipRepository.findOne({ where: { id } });
      }

      async update(id: string, updateMembershipInput: UpdateMembershipInput): Promise<MembershipEntity> {
        await this.membershipRepository.update(id, updateMembershipInput);
        const updatedMembership = await this.membershipRepository.findOne({ where: { id } });
        await pubSub.publish('onMembershipUpdated', { onMembershipUpdated: updatedMembership });
        return updatedMembership;
      }
    
      async remove(id: string): Promise<MembershipEntity> {
        const membership = await this.membershipRepository.findOne({ where: { id } });
    await this.membershipRepository.remove(membership);
    await pubSub.publish('onMembershipRemoved', { onMembershipRemoved: membership });
    return membership;
  }
}
