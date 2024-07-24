import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from 'graphql-subscriptions';
import { CreateSubscriptionPlanInput } from './dto/create-subscription-plan.input';
import { UpdateSubscriptionPlanInput } from './dto/update-subscription-plan.input';
import { SubscriptionPlanEntity } from './entities/subscription-plan.entity';
import { UserEntity } from '../users/entities/user.entity';
import { MembershipEntity } from '../membership/entities/membership.entity';

const pubSub = new PubSub();

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionRepository: Repository<SubscriptionPlanEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
  ) {}

  async create(
    createSubscriptionInput: CreateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity> {
    const { userId, membershipId, startDate } = createSubscriptionInput;

    const user = await this.userRepository.findOne({
      where: { id: String(userId) },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const membership = await this.membershipRepository.findOne({
      where: { id: String(membershipId) },
    });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    const newSubscription = this.subscriptionRepository.create({
      user,
      userId,
      membership,
      startDate,
    });

    const savedSubscription =
      await this.subscriptionRepository.save(newSubscription);

    await pubSub.publish('onSubscriptionPlanCreated', {
      onSubscriptionPlanCreated: savedSubscription,
    });
    return savedSubscription;
  }

  async findAll(): Promise<SubscriptionPlanEntity[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: string): Promise<SubscriptionPlanEntity> {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'membership'],
    });
  }

  async update(
    id: string,
    updateSubscriptionInput: UpdateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity> {
    await this.subscriptionRepository.update(id, updateSubscriptionInput);
    const updatedSubscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'membership'],
    });
    await pubSub.publish('onSubscriptioPlanUpdated', {
      onSubscriptionPlanUpdated: updatedSubscription,
    });
    return updatedSubscription;
  }

  async remove(id: string): Promise<{
    success: boolean;
    id: string;
  }> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user', 'membership'],
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    await this.subscriptionRepository.remove(subscription);

    return {
      success: true,
      id: subscription.id,
    };
  }
}
