import "next-auth";
// interface personalizada de la session , para que guarde el token y algunos datos en la session

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      data: {
        email: string;
        first_name: string ;
        last_name: string ;
        role: string | null;
        sub: string;
        iat: number;
        exp: number;
      };
    };
  }
}
