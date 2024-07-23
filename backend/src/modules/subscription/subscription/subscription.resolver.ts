import { Resolver, Mutation, Query, Args, Subscription } from '@nestjs/graphql';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionInput } from '../dto/create-subscription.input';
import { UpdateSubscriptionInput } from '../dto/update-subscription.input';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { PubSub } from 'graphql-subscriptions';

const pubSub= new PubSub();

@Resolver(() => SubscriptionEntity)
export class SubscriptionResolver {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Mutation(() => SubscriptionEntity)
    async createSubscription(
      @Args('createSubscriptionInput') createSubscriptionInput: CreateSubscriptionInput,
    ): Promise<SubscriptionEntity> {
      const subscription = await this.subscriptionService.create(createSubscriptionInput);
      pubSub.publish('onSubscriptionCreated', { onSubscriptionCreated: subscription });
      return subscription;
    }

    @Query(() => [SubscriptionEntity], { name: 'subscriptions' })
  async findAll(): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.findAll();
  }

  @Query(() => SubscriptionEntity, { name: 'subscription' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<SubscriptionEntity> {
    return this.subscriptionService.findOne(id);
  }

  @Mutation(() => SubscriptionEntity)
  async updateSubscription(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSubscriptionInput') updateSubscriptionInput: UpdateSubscriptionInput,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionService.update(id, updateSubscriptionInput);
    pubSub.publish('onSubscriptionUpdated', { onSubscriptionUpdated: subscription });
    return subscription;
  }

  @Mutation(() => Boolean)
  async removeSubscription(@Args('id',{ type: () => String }) id: string): Promise<Boolean> {
    const result = await this.subscriptionService.remove(id);
    return result;
  }

  @Subscription(() => SubscriptionEntity)
    onSubscriptionCreated() {
        return pubSub.asyncIterator('onSubscriptionCreated');
    }

    @Subscription(() => SubscriptionEntity)
    onSubscriptionUpdated() {
        return pubSub.asyncIterator('onSubscriptionUpdated');
    }

    @Subscription(() => SubscriptionEntity)
    onSubscriptionRemoved() {
        return pubSub.asyncIterator('onSubscriptionRemoved');
    }
}
