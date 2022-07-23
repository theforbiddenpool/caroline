import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  test('renders', () => {
    render(<Main />);

    expect(screen.queryByText(/hello/i)).toBeInTheDocument();
  });
});
