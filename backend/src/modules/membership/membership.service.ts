import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMembershipInput } from './dto/create-membership.input';
import { UpdateMembershipInput } from './dto/update-membership.input';
import { MembershipEntity } from './entities/membership.entity';
import { SubscriptionPlanEntity } from '../subscription-plan/entities/subscription-plan.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionRepository: Repository<SubscriptionPlanEntity>,
  ) {}

  async create(
    createMembershipInput: CreateMembershipInput,
  ): Promise<MembershipEntity> {
    const newMembership = this.membershipRepository.create(
      createMembershipInput,
    );
    return await this.membershipRepository.save(newMembership);
  }

  async findAll(): Promise<MembershipEntity[]> {
    return this.membershipRepository.find();
  }

  async findOne(id: string): Promise<MembershipEntity> {
    return this.membershipRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateMembershipInput: UpdateMembershipInput,
  ): Promise<MembershipEntity> {
    await this.membershipRepository.update(id, updateMembershipInput);
    return await this.membershipRepository.findOne({
      where: { id },
    });
  }

  async delete(id: string): Promise<MembershipEntity> {
    const membership = await this.membershipRepository.findOne({
      where: { id },
    });
    await this.membershipRepository.remove(membership);

    return membership;
  }
}
