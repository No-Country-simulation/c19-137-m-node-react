'use client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.token} <br />
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
