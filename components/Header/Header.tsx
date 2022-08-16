import { useSession } from 'next-auth/react';
import { UnauthenticatedNav, AuthenticatedNav } from './Nav';

function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full flex justify-between items-center bg-lime-300 p-5 mb-10">
      <h1 className="text-3xl font-medium">Caroline</h1>
      {status !== 'loading' && (
        <>
          {!session && <UnauthenticatedNav />}
          {session?.user && <AuthenticatedNav user={session.user} />}
        </>
      )}
    </header>
  );
}

export default Header;
