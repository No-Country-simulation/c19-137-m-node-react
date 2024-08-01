import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ProfileService } from '@/modules/profile/profile.service';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { TProfile } from '@/types/TProfile';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query('profile')
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: UserEntity): Promise<TProfile> {
    return await this.profileService.profile(user);
  }

  @Mutation('updateProfile')
  @UseGuards(GqlAuthGuard)
  async updateProfile(@CurrentUser() user: UserEntity): Promise<TProfile> {
    return await this.profileService.profile(user);
  }
}
