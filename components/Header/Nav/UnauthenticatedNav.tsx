import { signIn } from 'next-auth/react';
import Link from 'next/link';

export function UnauthenticatedNav() {
  return (
    <nav>
      <ul>
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
      </ul>
    </nav>
  );
}

export default UnauthenticatedNav;
