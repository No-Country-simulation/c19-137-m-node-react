import NextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  
  providers: [
    
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
