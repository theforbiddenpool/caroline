import { render, screen, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import server from '../../mocks/api';
import { sessionHandlerNoName, sessionHandlerLoggedOut } from '../../mocks/api/handlers';
import Header from './Header';

describe('Header', () => {
  test('renders when logged in', async () => {
    render(
      <SessionProvider session={undefined}>
        <Header />
      </SessionProvider>,
    );

    expect(screen.queryByText(/caroline/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/logout/i)).toBeInTheDocument();
      expect(screen.queryByText(/signed in as john/i)).toBeInTheDocument();
    });
  });

  test('displays email when user does\'t have a name', async () => {
    server.use(sessionHandlerNoName);

    render(
      <SessionProvider session={undefined}>
        <Header />
      </SessionProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/signed in as john@example.com/i)).toBeInTheDocument();
    });
  });

  test('renders when logged out', async () => {
    server.use(sessionHandlerLoggedOut);

    render(
      <SessionProvider session={undefined}>
        <Header />
      </SessionProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/sign in/i)).toBeInTheDocument();
    });
  });
});
