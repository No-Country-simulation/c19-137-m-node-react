
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
    firstName: string;
    lastName: string;
    bio: string;
    birthDate: Date;
}

export class CreateBookInput {
    name: string;
    authorId: string;
    rating: number;
    genre: string;
}

export class PostCommentInput {
    text: string;
    postId: string;
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
    mediaIds?: Nullable<string[]>;
}

export class CreateReviewInput {
    text: string;
    rating: number;
    bookId: string;
}

export class CreateSubscriptionPlanInput {
    user_id?: Nullable<string>;
    membershipId?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
}

export class UpdateSubscriptionPlanInput {
    id: string;
    userId?: Nullable<string>;
    membershipId?: Nullable<string>;
    startDe?: Nullable<string>;
    endDate?: Nullable<string>;
}

export class AddFavoriteBookInput {
    bookId: string;
}

export class CreateUserInput {
    nickName: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
    email: string;
}

export class UpdateUserInput {
    id: string;
    nickName?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
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

    abstract postComment(data?: Nullable<PostCommentInput>): Nullable<PostCommentResponse> | Promise<Nullable<PostCommentResponse>>;

    abstract uploadMedia(file: Upload, convertToBase64?: Nullable<boolean>): MediaResponse | Promise<MediaResponse>;

    abstract createMembership(data?: Nullable<CreateMembershipInput>): Nullable<Membership> | Promise<Nullable<Membership>>;

    abstract updateMembership(data?: Nullable<UpdateMembershipInput>): Nullable<Membership> | Promise<Nullable<Membership>>;

    abstract deleteMembership(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createPost(data?: Nullable<CreatePostInput>): Nullable<CreatePostResponse> | Promise<Nullable<CreatePostResponse>>;

    abstract createReview(data?: Nullable<CreateReviewInput>): Nullable<CreateReviewResponse> | Promise<Nullable<CreateReviewResponse>>;

    abstract createSubscriptionPlan(data?: Nullable<CreateSubscriptionPlanInput>): Nullable<SubscriptionPlan> | Promise<Nullable<SubscriptionPlan>>;

    abstract updateSubscriptionPlan(data?: Nullable<UpdateSubscriptionPlanInput>): Nullable<SubscriptionPlan> | Promise<Nullable<SubscriptionPlan>>;

    abstract removeSubscriptionPlan(id: string): Nullable<Response> | Promise<Nullable<Response>>;

    abstract addFavoriteBook(data?: Nullable<AddFavoriteBookInput>): Nullable<AddFavoriteBookResponse> | Promise<Nullable<AddFavoriteBookResponse>>;

    abstract followUser(userId: string, followUserId: string): User | Promise<User>;

    abstract setProfileImage(mediaId: string): User | Promise<User>;

    abstract setCoverImage(mediaId: string): User | Promise<User>;
}

export abstract class IQuery {
    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract authors(): Nullable<Author>[] | Promise<Nullable<Author>[]>;

    abstract author(id: string): Author | Promise<Author>;

    abstract authorByName(name?: Nullable<string>): Author[] | Promise<Author[]>;

    abstract books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract book(id: string): Nullable<Book> | Promise<Nullable<Book>>;

    abstract bookByGenre(genre: string): Nullable<Nullable<Book>[]> | Promise<Nullable<Nullable<Book>[]>>;

    abstract comment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract feed(userId: string): FeedItem[] | Promise<FeedItem[]>;

    abstract memberships(): Nullable<Membership>[] | Promise<Nullable<Membership>[]>;

    abstract membership(id: string): Nullable<Membership> | Promise<Nullable<Membership>>;

    abstract posts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;

    abstract review(id: string): Nullable<Review> | Promise<Nullable<Review>>;

    abstract subscriptionPlans(): Nullable<SubscriptionPlan>[] | Promise<Nullable<SubscriptionPlan>[]>;

    abstract subscriptionPlan(id: string): Nullable<SubscriptionPlan> | Promise<Nullable<SubscriptionPlan>>;

    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract usersByNickname(nickname: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract usersByName(name: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract usersByRole(role: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
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
    firstName: string;
    lastName: string;
    bio?: Nullable<string>;
    birthDate?: Nullable<Date>;
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
    publishedDate?: Nullable<Date>;
    reviews?: Nullable<Nullable<Review>[]>;
    comments?: Nullable<Nullable<Comment>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export class CreateBookResponse {
    code: number;
    success: boolean;
    message: string;
    book?: Nullable<Book>;
}

export class Comment {
    id: string;
    text?: Nullable<string>;
    datePosted?: Nullable<Date>;
    user?: Nullable<User>;
    post?: Nullable<Post>;
}

export class PostCommentResponse {
    code: number;
    success: boolean;
    message: string;
    comment?: Nullable<Comment>;
}

export class Media {
    id: string;
    url?: Nullable<string>;
    type: string;
    fileName: string;
    hashName: string;
    mimeType: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    base64?: Nullable<string>;
    size?: Nullable<number>;
}

export class MediaResponse {
    code: number;
    success: boolean;
    message: string;
    media: Media;
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
    createdAt?: Nullable<Date>;
    comments?: Nullable<Nullable<Comment>[]>;
    media?: Nullable<Nullable<Media>[]>;
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
    datePosted?: Nullable<Date>;
    user?: Nullable<User>;
    book?: Nullable<Book>;
}

export class CreateReviewResponse {
    code: number;
    success: boolean;
    message: string;
    review?: Nullable<Review>;
}

export class SubscriptionPlan {
    id: string;
    userId?: Nullable<string>;
    membershipId?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
}

export class User {
    id: string;
    nickName?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    age?: Nullable<number>;
    role?: Nullable<string>;
    enabled?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    following?: Nullable<Nullable<User>[]>;
    followers?: Nullable<Nullable<User>[]>;
    posts?: Nullable<Nullable<Post>[]>;
    favorites?: Nullable<Nullable<Book>[]>;
    reviews?: Nullable<Nullable<Review>[]>;
    comments?: Nullable<Nullable<Comment>[]>;
    books?: Nullable<Nullable<Book>[]>;
    coverImage?: Nullable<Media>;
    profileImage?: Nullable<Media>;
    bio?: Nullable<string>;
}

export class AddFavoriteBookResponse {
    code: number;
    success: boolean;
    message: string;
}

export type Upload = any;
export type FeedItem = Post | Review;
type Nullable<T> = T | null;
