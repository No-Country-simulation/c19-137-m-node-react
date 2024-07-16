import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ResetPasswordInput } from './dto/reset-password-input';
import { SignInInput } from './dto/signin-input';
import { ForgotPasswordInput } from './dto/forgot-password-input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { SignUpInput } from './dto/signup-input';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './auth.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Response)
  signIn(@Args() input: SignInInput) {
    const { email, password } = input;
    return this.authService.signIn(email, password);
  }

  @Mutation(() => Response)
  signUp(@Args('data') data: SignUpInput) {
    return this.authService.signUp(data);
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
  @UseGuards(GqlAuthGuard, RolesGuard)
  //@Roles(Role.MODERADOR)
  async me(@Context('req') req) {
    return this.authService.me(req);
  }
}
