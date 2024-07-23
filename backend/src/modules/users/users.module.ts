import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { UsersResolver } from './users.resolver';
import { Book } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordResetToken, Book])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
