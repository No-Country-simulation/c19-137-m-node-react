
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

export class CreateUserInput {
    nickname: string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    age: number;
    role: string;
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

    abstract signUp(input: CreateUserInput): Nullable<SignUpResponse> | Promise<Nullable<SignUpResponse>>;

    abstract forgotPassword(email: string): Nullable<Response> | Promise<Nullable<Response>>;

    abstract resetPassword(input: ResetPasswordInput): Nullable<Response> | Promise<Nullable<Response>>;
}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
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
}

type Nullable<T> = T | null;
