import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('renders', () => {
    render(<Counter total={3} foodId="beans1" date={new Date()} />);

    expect(screen.queryByText(/3/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/servings/i)).toHaveValue('');
  });
});
