import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MembershipService } from './membership.service';
import { MembershipEntity } from './entities/membership.entity';
import { CreateMembershipInput } from './dto/create-membership.input';
import { UpdateMembershipInput } from './dto/update-membership.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => MembershipEntity)
export class MembershipResolver {
  constructor(private readonly membershipService: MembershipService) {}

  /**
   * Crear una membresía
   * @param createMembershipInput
   */
  @Mutation(() => MembershipEntity)
  async createMembership(
    @Args('data') createMembershipInput: CreateMembershipInput,
  ): Promise<MembershipEntity> {
    const membership = this.membershipService.create(createMembershipInput);

    await pubSub.publish('onMembershipCreated', {
      onMembershipCreated: membership,
    });

    return membership;
  }

  @Query(() => [MembershipEntity], { name: 'memberships' })
  async findAll(): Promise<MembershipEntity[]> {
    return this.membershipService.findAll();
  }

  @Query(() => MembershipEntity, { name: 'membership' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<MembershipEntity> {
    return this.membershipService.findOne(id);
  }

  @Mutation(() => MembershipEntity)
  async updateMembership(
    @Args('id', { type: () => String }) id: string,
    @Args('updateMembershipInput') updateMembershipInput: UpdateMembershipInput,
  ): Promise<MembershipEntity> {
    const updatedMembership = await this.membershipService.update(
      id,
      updateMembershipInput,
    );

    // Publicar la membresía actualizada
    await pubSub.publish('onMembershipUpdated', {
      onMembershipUpdated: updatedMembership,
    });

    return updatedMembership;
  }

  @Mutation(() => MembershipEntity)
  async deleteMembership(
    @Args('id', { type: () => String }) id: string,
  ): Promise<MembershipEntity> {
    const deletedMembership = await this.membershipService.delete(id);

    // Publicar la membresía eliminada
    await pubSub.publish('onMembershipDeleted', {
      onMembershipDeleted: deletedMembership,
    });

    return deletedMembership;
  }

  /**
   * Subscription para obtener la membresía creada
   */
  @Subscription(() => MembershipEntity)
  onMembershipCreated() {
    return pubSub.asyncIterator('onMembershipCreated');
  }

  @Subscription(() => MembershipEntity)
  onMembershipUpdated() {
    return pubSub.asyncIterator('onMembershipUpdated');
  }

  @Subscription(() => MembershipEntity)
  onMembershipDeleted() {
    return pubSub.asyncIterator('onMembershipDeleted');
  }
}
