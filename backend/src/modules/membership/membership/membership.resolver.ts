import { Resolver,  Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MembershipService } from './membership.service';
import { MembershipEntity } from '../entities/membership.entity';
import { CreateMembershipInput } from '../dto/create-membership.input';
import { UpdateMembershipInput } from '../dto/update-membership.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub= new PubSub();

@Resolver(() => MembershipEntity)
export class MembershipResolver {
    constructor(private readonly membershipService: MembershipService) {}

  @Mutation(() => MembershipEntity)
  async createMembership(@Args('createMembershipInput') createMembershipInput: CreateMembershipInput): Promise<MembershipEntity> {
    return this.membershipService.create(createMembershipInput);
  }

  @Query(() => [MembershipEntity], { name: 'memberships' })
  async findAll(): Promise<MembershipEntity[]> {
    return this.membershipService.findAll();
  }

  @Query(() => MembershipEntity, { name: 'membership' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<MembershipEntity> {
    return this.membershipService.findOne(id);
  }
  @Mutation(() => MembershipEntity)
  async updateMembership(@Args('id', { type: () => String }) id: string, @Args('updateMembershipInput') updateMembershipInput: UpdateMembershipInput): Promise<MembershipEntity> {
    return this.membershipService.update(id, updateMembershipInput);
  }

  @Mutation(() => MembershipEntity)
  async removeMembership(@Args('id', { type: () => String }) id: string): Promise<MembershipEntity> {
    return this.membershipService.remove(id);
  }

  @Subscription(() => MembershipEntity)
  onMembershipCreated() {
      return pubSub.asyncIterator('onMembershipCreated');
  }

  @Subscription(() => MembershipEntity)
  onMembershipUpdated() {
      return pubSub.asyncIterator('onMembershipUpdated');
  }

  @Subscription(() => MembershipEntity)
  onMembershipRemoved() {
      return pubSub.asyncIterator('onMembershipRemoved');
  }
}