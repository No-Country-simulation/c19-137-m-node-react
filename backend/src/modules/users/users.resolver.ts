import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';

import {UsersService} from './users.service';
import {UserEntity} from './entities/user.entity';
import {GqlAuthGuard} from '../auth/guards/gql-auth.guard';
import {UseGuards} from '@nestjs/common';

import {addFavoriteBookInput} from './dto/add-favorite-book.input';
import {CurrentUser} from '@/modules/auth/decorators/current-user.decorator';
import {SetProfileResponse} from "@/modules/users/dto/set-profile-response";
import {SetProfileImagesMediaInput} from "@/modules/users/dto/set-profile-images-media.input";
import {User} from "@/graphql.schema";
import {CreateUserInput} from "@/modules/users/dto/create-user.input";
import {UpdateUserInput} from "@/modules/users/dto/update-user.input";

@Resolver(() => UserEntity)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {
    }

    //Lista de frases motivacionales que se van a enviar a los subscriptores
    private phrases: string[] = [
        'La vida es una aventura, atrévete.',
        'La mejor manera de predecir el futuro es inventarlo.',
        'No hay atajos para cualquier lugar al que merezca la pena ir.',
        'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
        'Cree en ti mismo y en todo lo que eres.',
    ];

    @Query('users')
    @UseGuards(GqlAuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

    @Query('user')
    findById(@Args('id') id: string) {
        return this.usersService.findById(id);
    }

    @Query('usersByNickname')
    findByNickname(@Args('nickname') nickname: string) {
        return this.usersService.findByNickname(nickname);
    }

    @Query('usersByName')
    findByName(@Args('name') name: string) {
        return this.usersService.findByName(name);
    }

    @Query('usersByRole')
    findByRole(@Args('role') role: string) {
        return this.usersService.findByRole(role);
    }

    @Mutation('addFavoriteBook')
    @UseGuards(GqlAuthGuard)
    addFavoriteBook(
        @Args('data') data: addFavoriteBookInput,
        @CurrentUser() user: UserEntity,
    ) {
        return this.usersService.addFavoriteBook(data, user);
    }

    @Mutation(() => UserEntity)
    async followUser(
        @Args('followUserId', {type: () => String}) followUserId: string,
        @CurrentUser() user: UserEntity,
    ): Promise<UserEntity> {
        return this.usersService.followUser(followUserId, user);
    }


    @Mutation('setCoverImage')
    @UseGuards(GqlAuthGuard)
    async setCoverImage(
        @Args('data') data: SetProfileImagesMediaInput,
        @CurrentUser() user: UserEntity,
    ) {

        try {

            if (!data.mediaId) {
                throw new Error('No se ha proporcionado una imagen de portada');
            }
            const userEdited = await this.usersService.setCoverImage(data.mediaId, user);

            return {
                code: 200,
                message: 'Imagen de portada actualizada',
                success: true,
                user: userEdited
            } as unknown as User
        } catch (error) {
            return {
                code: 400,
                message: error.message,
                success: false,
            };
        }
    }


    @Mutation('setProfileImage')
    @UseGuards(GqlAuthGuard)
    async setProfileImage(
        @Args('data') data: SetProfileImagesMediaInput,
        @CurrentUser() user: UserEntity,
    ) {
        try {

            console.log('data', data);
            if (!data.mediaId) {
                throw new Error('No se ha proporcionado una imagen de perfil');
            }
            const userEdited = await this.usersService.setProfileImage(data.mediaId, user);

            return {
                code: 200,
                message: 'Imagen de perfil actualizada',
                success: true,
                user: userEdited
            };
        } catch (error) {
            return {
                code: 400,
                message: error.message,
                success: false,
            };
        }
    }


    @Mutation(() => UserEntity)
    @UseGuards(GqlAuthGuard)
    async updateProfile(
        @Args('data') data: UpdateUserInput,
        @CurrentUser() user: UserEntity,
    ) {
        try {
            const userUpdated = await this.usersService.update({
                ...data,
                id: user.id
            });

            return {
                code: 200,
                message: 'Perfil actualizado',
                success: true,
                user: userUpdated
            };

        } catch (error) {
            return {
                code: 400,
                message: error.message,
                success: false,
            };
        }
    }


}
