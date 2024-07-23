import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { CreateSubscriptionInput } from '../dto/create-subscription.input';
import { UpdateSubscriptionInput } from '../dto/update-subscription.input';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { User } from '../../users/entities/user.entity';
import { MembershipEntity } from '../../membership/entities/membership.entity';

const pubSub = new PubSub();

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(MembershipEntity)
        private readonly membershipRepository: Repository<MembershipEntity>,
      ) {}
    
      async create(createSubscriptionInput: CreateSubscriptionInput): Promise<SubscriptionEntity> {
        const { userId, membershipId, startDate } = createSubscriptionInput;
    
        const user = await this.userRepository.findOne({ where: { id: String(userId) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
        const membership = await this.membershipRepository.findOne({ where: { id: String(membershipId) } });
        if (!membership) {
          throw new NotFoundException('Membership not found');
        }
    
        const newSubscription = this.subscriptionRepository.create({
          user,  
          userId,
          membership,
          startDate,
        });
    
        const savedSubscription = await this.subscriptionRepository.save(newSubscription);
        await pubSub.publish('onSubscriptionCreated', { onSubscriptionCreated: savedSubscription });
        return savedSubscription;
      }
    
      async findAll(): Promise<SubscriptionEntity[]> {
        return this.subscriptionRepository.find();
      }
    
      async findOne(id: string): Promise<SubscriptionEntity> {
        return this.subscriptionRepository.findOne({ where: { id }, relations: ['user', 'membership'] });
      }
    
      async update(id: string, updateSubscriptionInput: UpdateSubscriptionInput): Promise<SubscriptionEntity> {
        await this.subscriptionRepository.update(id, updateSubscriptionInput);
        const updatedSubscription = await this.subscriptionRepository.findOne({ where: { id }, relations: ['user', 'membership'] });
        await pubSub.publish('onSubscriptionUpdated', { onSubscriptionUpdated: updatedSubscription });
        return updatedSubscription;
      }
    
      async remove(id: string): Promise<Boolean> {
        const subscription = await this.subscriptionRepository.findOne({ where: { id }, relations: ['user', 'membership'] });
        if (!subscription) {
          throw new NotFoundException('Subscription not found');
        }
        await this.subscriptionRepository.remove(subscription);
        await pubSub.publish('onSubscriptionRemoved', { onSubscriptionRemoved: subscription });
        return true;
      }
}
