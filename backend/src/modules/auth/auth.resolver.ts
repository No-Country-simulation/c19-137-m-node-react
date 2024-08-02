import {Resolver, Mutation, Args, Query, Context} from '@nestjs/graphql';
import {AuthService} from './auth.service';
import {ResetPasswordInput} from './dto/reset-password-input';
import {SignInInput} from './dto/signin-input';
import {ForgotPasswordInput} from './dto/forgot-password-input';
import {GqlAuthGuard} from './guards/gql-auth.guard';
import {UseGuards} from '@nestjs/common';
import {UserEntity} from '../users/entities/user.entity';
import {SignUpInput} from './dto/signup-input';
import {RolesGuard} from './guards/roles.guard';
import {PubSub} from 'graphql-subscriptions';
import {CurrentUser} from "@/modules/auth/decorators/current-user.decorator";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
    }

    /**
     * Iniciar sesion de un usuario, retorna un token de acceso (JWT) si el correo y la contraseña son correctos
     * @param input
     */
    @Mutation(() => Response)
    signIn(@Args() input: SignInInput) {
        const {email, password} = input;
        return this.authService.signIn(email, password);
    }

    /**
     * Registrar un nuevo usuario, atraves de este se crear un nuevo usuario en la base de datos
     * @param data
     */
    @Mutation(() => Response)
    signUp(@Args('data') data: SignUpInput) {
        return this.authService.signUp(data);
    }

    /**
     * Enviar un correo electrónico con un enlace para restablecer la contraseña
     * @param input
     */
    @Mutation(() => Response)
    forgotPassword(@Args() input: ForgotPasswordInput) {
        const {email} = input;

        if (!email) {
            return {
                code: 400,
                message: 'El correo electrónico es requerido',
                success: false,
            };
        }

        return this.authService.forgotPassword(email);
    }

    /**
     * Restablecer la contraseña de un usuario,se requiere el token y la nueva contraseña
     * @param data
     */
    @Mutation(() => Response)
    resetPassword(@Args('data') data: ResetPasswordInput) {
        return this.authService.resetPassword(data);
    }


    /**
     * Consulta para obtener el usuario autenticado
     * @param user
     */
    @Query(() => UserEntity)
    @UseGuards(GqlAuthGuard)
    @UseGuards(GqlAuthGuard, RolesGuard)
    async profile(
        @CurrentUser() user: UserEntity,
    ) {
        try {
            return this.authService.profile(user);
        } catch (error) {
            return {
                code: 400,
                message: 'Error al obtener el perfil del usuario',
                line: error.line,
                success: false,
            }
        }
    }
}
