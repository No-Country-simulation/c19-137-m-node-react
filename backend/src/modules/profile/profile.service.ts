import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { TProfile } from '@/types/TProfile';

@Injectable()
export class ProfileService {
  async profile(user: UserEntity): Promise<TProfile> {
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        nickName: user.nickname,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        age: user.age,
        comments: user.comments,
      },
      profileCoverImage: null,
      profileImage: null,
    } as unknown as TProfile;
  }
}
