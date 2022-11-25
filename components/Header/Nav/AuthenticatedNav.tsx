import type { Session } from 'next-auth';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface AuthenticatedNavProps extends Required<Pick<Session, 'user'>> {}

export function AuthenticatedNav({ user }: AuthenticatedNavProps) {
  const { t } = useTranslation();

  return (
    <div className="inline-flex">
      <p className="mr-4">
        {t('signed in as', { user: user.name ?? user.email })}
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
              {t('logout')}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AuthenticatedNav;
