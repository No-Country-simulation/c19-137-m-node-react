
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

export class CreateBookInput {
    name: string;
    author: string;
    rating: number;
}

export class CreatePostInput {
    title: string;
    content: string;
    userId: string;
}

export class AddFavoriteBookInput {
    userId: string;
    bookId: string;
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

    abstract createBook(data?: Nullable<CreateBookInput>): Nullable<CreateBookResponse> | Promise<Nullable<CreateBookResponse>>;

    abstract createPost(data?: Nullable<CreatePostInput>): Nullable<CreatePostResponse> | Promise<Nullable<CreatePostResponse>>;

    abstract addFavoriteBook(data?: Nullable<AddFavoriteBookInput>): Nullable<AddFavoriteBookResponse> | Promise<Nullable<AddFavoriteBookResponse>>;
}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract book(id: string): Nullable<Book> | Promise<Nullable<Book>>;

    abstract posts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract onUserCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract onTextHelloCreated(): Nullable<string> | Promise<Nullable<string>>;
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

export class Book {
    id: string;
    name?: Nullable<string>;
    author?: Nullable<string>;
    rating?: Nullable<number>;
    users?: Nullable<Nullable<User>[]>;
}

export class CreateBookResponse {
    code: number;
    success: boolean;
    message: string;
    book?: Nullable<Book>;
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
}

export class AddFavoriteBookResponse {
    code: number;
    success: boolean;
    message: string;
}

type Nullable<T> = T | null;
