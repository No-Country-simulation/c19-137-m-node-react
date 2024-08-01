
export interface User {
    __typename: string;
    id: string;
    nickName?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age?: number;
    role?: string;
    enabled?: boolean;
    createdAt: string;
}
