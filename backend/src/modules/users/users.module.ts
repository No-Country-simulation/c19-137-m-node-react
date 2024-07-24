import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PasswordResetTokenEntity } from './entities/password-reset-token.entity';
import { UsersResolver } from './users.resolver';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PasswordResetTokenEntity,
      BookEntity,
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
