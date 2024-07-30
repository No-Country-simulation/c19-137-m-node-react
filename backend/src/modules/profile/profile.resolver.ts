import {Context, Query, Resolver} from "@nestjs/graphql";

@Resolver('Profile')
export class ProfileResolver {

    @Query('profile')
    async profile(@Context('req') context) {
        return context.req.user;

    }
}