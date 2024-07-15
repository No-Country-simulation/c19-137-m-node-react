// src/modules/auth/jwt-payload.interface.ts
export interface JwtPayload {
  id: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
  role: string;
}
