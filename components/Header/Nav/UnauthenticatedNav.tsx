import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

export function UnauthenticatedNav() {
  const { t } = useTranslation();

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
            {t('sign in')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UnauthenticatedNav;
