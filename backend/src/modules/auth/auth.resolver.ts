import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { ResetPasswordInput } from './dto/reset-password-input';
import { SignInInput } from './dto/signin-input';
import { ForgotPasswordInput } from './dto/forgot-password-input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => Response)
  signIn(@Args() input: SignInInput) {
    const { email, password } = input;
    return this.authService.signIn(email, password);
  }

  @Mutation(() => Response)
  signUp(@Args('input') input: CreateUserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => Response)
  forgotPassword(@Args() input: ForgotPasswordInput) {
    const { email } = input;

    if (!email) {
      return {
        code: 400,
        message: 'El correo electrónico es requerido',
        success: false,
      };
    }

    return this.authService.forgotPassword(email);
  }

  @Mutation(() => Response)
  resetPassword(@Args('input') input: ResetPasswordInput) {
    return this.authService.resetPassword(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@Context('req') req) {
    return this.authService.me(req);
  }
}