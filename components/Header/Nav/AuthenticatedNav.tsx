import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface AuthenticatedNavProps extends Required<Pick<Session, 'user'>> {}

export function AuthenticatedNav({ user }: AuthenticatedNavProps) {
  return (
    <div className="inline-flex">
      <p className="mr-4">
        Signed in as
        {' '}
        {user.name ?? user.email}
      </p>
      <nav>
        <ul>
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
        </ul>
      </nav>
    </div>
  );
}

export default AuthenticatedNav;
