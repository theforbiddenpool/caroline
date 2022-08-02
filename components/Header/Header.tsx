import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex items-center bg-lime-300 p-5 mb-10">
      <h1 className="text-3xl font-medium flex-grow">Caroline</h1>
      {session?.user && (
      <p className="mr-4">
        Signed in as
        {' '}
        {session.user.name ?? session.user.email}
      </p>
      )}
      <nav>
        <ul>
          {!session && (
          <li>
            <Link
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </Link>
          </li>
          )}

          {session?.user && (
          <li>
            <Link
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Logout
            </Link>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
