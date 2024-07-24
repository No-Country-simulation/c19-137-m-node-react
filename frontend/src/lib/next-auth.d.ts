import "next-auth";
import { JwtPayload } from "jsonwebtoken";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      data: {
        role: string | null;
        first_name: string;
        last_name: string;
        role: string | null;
        sub: string;
        iat: number;
        exp: number;
      };
    };
  }
}
