export type ProfileToken = {
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  sub: string;
  iat: number;
  exp: number;
};
