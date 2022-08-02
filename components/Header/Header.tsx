import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-lime-300 mb-10">
      <nav>
        <ul className="flex justify-end p-5">
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
