import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { SubscriptionPlanService } from './subscription-plan.service';
import { CreateSubscriptionPlanInput } from './dto/create-subscription-plan.input';
import { UpdateSubscriptionPlanInput } from './dto/update-subscription-plan.input';
import { SubscriptionPlanEntity } from './entities/subscription-plan.entity';
import { PubSub } from 'graphql-subscriptions';
import { Response } from '../../graphql/dto/response';

const pubSub = new PubSub();

@Resolver(() => SubscriptionPlanEntity)
export class SubscriptionPlanResolver {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  /**
   * Mutacion para crear un nuevo plan de suscripción
   * @param createSubscriptionPlanInput
   */
  @Mutation(() => SubscriptionPlanEntity)
  async createSubscriptionPlan(
    @Args('createSubscriptionPlanInput')
    createSubscriptionPlanInput: CreateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity> {
    // Crear un nuevo plan de suscripción
    const subscriptionPlanCreated = await this.subscriptionPlanService.create(
      createSubscriptionPlanInput,
    );

    // Publicar el plan de suscripción creado
    await pubSub.publish('onSubscriptionPlanCreated', {
      onSubscriptionPlanCreated: subscriptionPlanCreated,
    });

    return subscriptionPlanCreated;
  }

  /**
   * Consulta para obtener todos los planes de suscripción
   */
  @Query(() => [SubscriptionPlanEntity], { name: 'subscriptionPlans' })
  async findAll(): Promise<SubscriptionPlanEntity[]> {
    return this.subscriptionPlanService.findAll();
  }

  /**
   * Consulta para obtener un plan de suscripción por su id
   * @param id
   */
  @Query(() => SubscriptionPlanEntity, { name: 'subscriptionPlan' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<SubscriptionPlanEntity> {
    return this.subscriptionPlanService.findOne(id);
  }

  @Mutation(() => SubscriptionPlanEntity)
  async updateSubscriptionPlan(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity | Response> {
    try {
      const updatedSubscriptionPlan = await this.subscriptionPlanService.update(
        id,
        updateSubscriptionInput,
      );

      // Publicar el plan de suscripción actualizado
      await pubSub.publish('onSubscriptionPlanUpdated', {
        onSubscriptionPlanUpdated: updatedSubscriptionPlan,
      });

      return updatedSubscriptionPlan;
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        success: false,
      };
    }
  }

  @Mutation(() => Boolean)
  async removeSubscriptionPlan(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Response> {
    try {
      // Eliminar el plan de suscripción
      const deletedSubscriptionPlan =
        await this.subscriptionPlanService.remove(id);

      // Publicar el plan de subscription eliminado
      await pubSub.publish('onSubscriptionPlanRemoved', {
        onSubscriptionPlanRemoved: {
          id: deletedSubscriptionPlan.id,
        },
      });

      return {
        code: 200,
        message: 'Plan de suscripción eliminado correctamente',
        success: true,
      };
    } catch (error) {
      return {
        code: 400,
        message: error.message,
        success: false,
      };
    }
  }

  /**
   * Suscripción para cuando se crea un nuevo plan de suscripción
   */
  @Subscription(() => SubscriptionPlanEntity)
  onSubscriptionPlanCreated() {
    return pubSub.asyncIterator('onSubscriptionPlanCreated');
  }

  /**
   * Suscripción para cuando se actualiza un plan de suscripción
   */
  @Subscription(() => SubscriptionPlanEntity)
  onSubscriptionPlanUpdated() {
    return pubSub.asyncIterator('onSubscriptionPlanUpdated');
  }

  /**
   * Suscripción para cuando se elimina un plan de suscripción
   */
  @Subscription(() => SubscriptionPlanEntity)
  onSubscriptionPlanRemoved() {
    return pubSub.asyncIterator('onSubscriptionPlanRemoved');
  }
}
