'use client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session , status} = useSession();

  if (status === 'loading') {
    return <div>Cargando ...</div>; 
  }

  if (session) {
    return (
      <>
        los siguientes datos se recuperan de la session de usuario
        <br />

        email {session.user.data.email} <br />
        first_name {session.user.data.first_name} <br />
        lastname {session.user.data.last_name} <br />
        <div>
          {session?.user?.data?.role ? (
            <p>Role: {session.user.data.role}</p>
          ) : (
            <p>El usuario no tiene un rol asignado</p>
          )}
        </div>
        sub {session.user.data.sub} <br />
        iat {session.user.data.iat} <br />
        exp {session.user.data.exp} <br />

        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
  
}