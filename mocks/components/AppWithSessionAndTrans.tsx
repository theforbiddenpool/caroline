import type { Session } from 'next-auth';
import AppWithSession from './AppWithSession';
import AppWithTranslation from './AppWithTranslation';

interface AppWithSessionAndTransProps {
  session?: Session;
  children: React.ReactNode;
}

function AppWithSessionAndTrans({ session = undefined, children }: AppWithSessionAndTransProps) {
  return (
    <AppWithSession session={session}>
      <AppWithTranslation>
        {children}
      </AppWithTranslation>
    </AppWithSession>
  );
}

export default AppWithSessionAndTrans;
