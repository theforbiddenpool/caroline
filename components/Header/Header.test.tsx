import { render, screen, waitFor } from '@testing-library/react';
import server from '../../mocks/api';
import { session as sessionHandlers } from '../../mocks/api/handlers';
import Header from './Header';
import { AppWithSession } from '../../mocks/components';

describe('Header', () => {
  test('renders when logged in', async () => {
    render(
      <AppWithSession>
        <Header />
      </AppWithSession>,
    );

    expect(screen.queryByText(/caroline/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/logout/i)).toBeInTheDocument();
      expect(screen.queryByText(/signed in as john/i)).toBeInTheDocument();
    });
  });

  test('displays email when user does\'t have a name', async () => {
    server.use(sessionHandlers.noName);

    render(
      <AppWithSession>
        <Header />
      </AppWithSession>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/signed in as john@example.com/i)).toBeInTheDocument();
    });
  });

  test('renders when logged out', async () => {
    server.use(sessionHandlers.loggedOut);

    render(
      <AppWithSession>
        <Header />
      </AppWithSession>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/sign in/i)).toBeInTheDocument();
    });
  });
});
