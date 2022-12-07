import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface AppWithSessionProps {
  session?: Session;
  children: React.ReactNode;
}

function AppWithSession({ session = undefined, children }: AppWithSessionProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}

export default AppWithSession;
