import { Module } from '@nestjs/common';
import { ProfileResolver } from '@/modules/profile/profile.resolver';
import { ProfileService } from '@/modules/profile/profile.service';

@Module({
  providers: [ProfileResolver, ProfileService],
  exports: [],
})
export class ProfileModule {}
