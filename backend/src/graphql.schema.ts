
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ResetPasswordInput {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}

export class CreateAuthorInput {
    first_name: string;
    last_name: string;
    bio: string;
    birth_date: Date;
}

export class CreateBookInput {
    name: string;
    authorId: string;
    rating: number;
    genre: string;
}

export class CreateMembershipInput {
    name?: Nullable<string>;
    cost?: Nullable<number>;
    duration?: Nullable<number>;
}

export class UpdateMembershipInput {
    id: string;
    name?: Nullable<string>;
    cost?: Nullable<number>;
    duration?: Nullable<number>;
}

export class CreatePostInput {
    title: string;
    content: string;
    userId: string;
}

export class CreateReviewInput {
    text: string;
    rating: number;
    userId: string;
    bookId: string;
}

export class AddFavoriteBookInput {
    userId: string;
    bookId: string;
}

export class CreateSubscriptionPlanInput {
    user_id?: Nullable<string>;
    membership_id?: Nullable<string>;
    start_date?: Nullable<string>;
    end_date?: Nullable<string>;
}

export class UpdateSubscriptionPlanInput {
    id: string;
    user_id?: Nullable<string>;
    membership_id?: Nullable<string>;
    start_date?: Nullable<string>;
    end_date?: Nullable<string>;
}

export class CreateUserInput {
    nickname: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
    email: string;
}

export class UpdateUserInput {
    id: string;
    nickname?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    age?: Nullable<number>;
    role?: Nullable<string>;
    enabled?: Nullable<boolean>;
}

export class Response {
    code: number;
    success: boolean;
    message: string;
}

export abstract class IMutation {
    abstract signIn(email: string, password: string): Nullable<SignInResponse> | Promise<Nullable<SignInResponse>>;

    abstract signUp(data: CreateUserInput): Nullable<SignUpResponse> | Promise<Nullable<SignUpResponse>>;

    abstract forgotPassword(email: string): Nullable<Response> | Promise<Nullable<Response>>;

    abstract resetPassword(data: ResetPasswordInput): Nullable<Response> | Promise<Nullable<Response>>;

    abstract createAuthor(data?: Nullable<CreateAuthorInput>): Nullable<CreateAuthorResponse> | Promise<Nullable<CreateAuthorResponse>>;

    abstract createBook(data?: Nullable<CreateBookInput>): Nullable<CreateBookResponse> | Promise<Nullable<CreateBookResponse>>;

    abstract createMembership(data?: Nullable<CreateMembershipInput>): Nullable<Membership> | Promise<Nullable<Membership>>;

    abstract updateMembership(data?: Nullable<UpdateMembershipInput>): Nullable<Membership> | Promise<Nullable<Membership>>;

    abstract deleteMembership(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createPost(data?: Nullable<CreatePostInput>): Nullable<CreatePostResponse> | Promise<Nullable<CreatePostResponse>>;


    abstract createReview(data?: Nullable<CreateReviewInput>): Nullable<CreateReviewResponse> | Promise<Nullable<CreateReviewResponse>>;

    abstract addFavoriteBook(data?: Nullable<AddFavoriteBookInput>): Nullable<AddFavoriteBookResponse> | Promise<Nullable<AddFavoriteBookResponse>>;

}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract authors(): Nullable<Author>[] | Promise<Nullable<Author>[]>;

    abstract author(id: string): Author | Promise<Author>;

    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract book(id: string): Nullable<Book> | Promise<Nullable<Book>>;

    abstract posts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;


    abstract reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;

    abstract review(id: string): Nullable<Review> | Promise<Nullable<Review>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract onBookCreated(): Nullable<Book> | Promise<Nullable<Book>>;

    abstract onBookDeleted(): Nullable<Book> | Promise<Nullable<Book>>;

    abstract onBookUpdated(): Nullable<Book> | Promise<Nullable<Book>>;

    abstract onMembershipCreated(): Membership | Promise<Membership>;

    abstract onMembershipUpdated(): Membership | Promise<Membership>;

    abstract onMembershipDeleted(): Membership | Promise<Membership>;

    abstract onSubscriptionPlanCreated(): SubscriptionPlan | Promise<SubscriptionPlan>;

    abstract onSubscriptionPlanUpdated(): SubscriptionPlan | Promise<SubscriptionPlan>;

    abstract onSubscriptionPlanRemoved(): SubscriptionPlan | Promise<SubscriptionPlan>;

    abstract onUserCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract onMotivationalPhrase(): Nullable<string> | Promise<Nullable<string>>;
}

export class SignInResponse {
    code: number;
    message: string;
    success: boolean;
    token?: Nullable<string>;
    expire_at?: Nullable<Date>;
}

export class SignUpResponse {
    code: number;
    success: boolean;
    message: string;
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export class UpdatePasswordResponse {
    code: number;
    success: boolean;
    message: string;
}

export class Author {
    id: string;
    first_name: string;
    last_name: string;
    bio?: Nullable<string>;
    birth_date?: Nullable<Date>;
    books?: Nullable<Nullable<Book>[]>;
}

export class CreateAuthorResponse {
    code: number;
    success: boolean;
    message: string;
}

export class Book {
    id: string;
    name?: Nullable<string>;
    author?: Nullable<Author>;
    rating?: Nullable<number>;
    genre?: Nullable<string>;
    users?: Nullable<Nullable<User>[]>;
    reviews?: Nullable<Nullable<Review>[]>;
}

export class CreateBookResponse {
    code: number;
    success: boolean;
    message: string;
    book?: Nullable<Book>;
}

export class Membership {
    id: string;
    name?: Nullable<string>;
    cost?: Nullable<number>;
    duration?: Nullable<number>;
}

export class Post {
    id: string;
    user: User;
    title?: Nullable<string>;
    content?: Nullable<string>;
    created_at?: Nullable<Date>;
}

export class CreatePostResponse {
    code: number;
    success: boolean;
    message: string;
    post?: Nullable<Post>;
}


export class Review {
    id: string;
    text?: Nullable<string>;
    rating?: Nullable<number>;
    date_posted?: Nullable<Date>;
    user?: Nullable<User>;
    book?: Nullable<Book>;
}

export class CreateReviewResponse {
    code: number;
    success: boolean;
    message: string;
    review?: Nullable<Review>;

}

export class User {
    id: string;
    nickname?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    age?: Nullable<number>;
    role?: Nullable<string>;
    enabled?: Nullable<boolean>;
    created_at?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
    favorites?: Nullable<Nullable<Book>[]>;
    reviews?: Nullable<Nullable<Review>[]>;
}

export class AddFavoriteBookResponse {
    code: number;
    success: boolean;
    message: string;

}

type Nullable<T> = T | null;
