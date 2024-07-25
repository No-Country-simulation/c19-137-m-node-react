import NextAuth, { AuthOptions } from "next-auth";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";


// interface del token segun el backend
interface ProfileToken {
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  sub: string;
  iat: number;
  exp: number;
};

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// NOTA: revisar el secret que esta en deploy, se corrio el back a nivel local para que funcione
// aparentemente el back que esta desplegado formula el token pero no le inyecta el secret se ve los datos en jwt.io 
// pero a nivel de seguridad en el front falla , deje algunso console.log se puede descomentar para realizar el test.

const secret = `${process.env.JWT_SECRET}`;

//console.log("esto es el secret jwt parte del forntend", secret);
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: gql`
              mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                  code
                  message
                  success
                  token
                  expire_at
                }
              }
            `,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          if (data.signIn.success) {
            console.log("Data:", {
              ...data.signIn,
            });
            return {
              ...data.signIn,
            };
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      // console.log("esto deberia ser el token pero envia un Objeto a nextauth", token);
      return token;
    },
    async session({ session, token }) {

      session.user = token as any;
      // Nota. como el back envia un objeto entones usaremos la propiedad token de token
      const tokenToString = String(token.token);
      
      
      //console.log("esto es el token" , tokenToString);
      //console.log(typeof tokenToString); 

      const data = jwt.verify(tokenToString, secret) as ProfileToken;
      //console.log("esto son los datos del token", data);
      if (data) {
        session.user.data = data
      }
      return session;
    },
  },
  // IMPORTANTE : para que el boton envie al usuario al interfaz correspondiente o personalizado
  // podras asignarselos con las siguientes paginas
   pages: {
     signIn: '/LoginAccountPage', // Página de inicio de sesión importantante, puede cambiarse de ruta segun en donde lo coloco Oswaldo
  //   signOut: '/auth/signout', // Página de cierre de sesión , menos importnate esto es si se personaliza da igual
  //   error: '/auth/error', // Página de error de autenticación , menos importnate esto es si se personaliza da igual
  //   verifyRequest: '/auth/verify-request', // Página de verificación de solicitud , menos importnate esto es si se personaliza da igual
  //   newUser: '/auth/new-user' // Página para nuevos usuarios, esto es para otro tipo de proveedores
   }
});

export { handler as GET, handler as POST };
