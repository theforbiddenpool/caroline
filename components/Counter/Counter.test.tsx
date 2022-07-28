import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter', () => {
  test('renders', () => {
    render(<Counter total={3} />);

    expect(screen.queryByText(/3/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/servings/i)).toHaveValue('');
  });

  test('button increments/decrements value by 0.5', async () => {
    render(<Counter total={3} />);
    const user = userEvent.setup();

    const incrementButton = screen.getByRole('button', { name: 'increment' });
    const decrementButton = screen.getByRole('button', { name: 'decrement' });
    const input = screen.getByLabelText(/servings/i);

    await user.click(incrementButton);
    expect(input).toHaveValue('0.5');
    await user.click(incrementButton);
    expect(input).toHaveValue('1');

    await user.click(decrementButton);
    expect(input).toHaveValue('0.5');
    await user.click(decrementButton);
    expect(input).toHaveValue('0');
    // doesn't go to negative values
    await user.click(decrementButton);
    expect(input).toHaveValue('0');
  });

  test('input only allows numbers', async () => {
    render(<Counter total={3} />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);

    await user.type(input, 'abc+');
    expect(input).toHaveValue('');

    // allows the decimal point
    await user.type(input, '4.5');
    expect(input).toHaveValue('4.5');

    // doesn't allow letters after
    await user.type(input, 'ab`');
    expect(input).toHaveValue('4.5');

    // doesn't allow a 2nd decimal point
    await user.type(input, '6.');
    expect(input).toHaveValue('4.56');
  });

  test('when started with a decimal point, automatically appends a 0', async () => {
    render(<Counter total={3} />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);

    await user.type(input, '.5');
    expect(input).toHaveValue('0.5');
  });

  test('keyboard accessibility', async () => {
    render(<Counter total={3} />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);

    await user.type(input, '{ArrowUp}{ArrowUp}');
    expect(input).toHaveValue('1');

    await user.type(input, '{ArrowDown}');
    expect(input).toHaveValue('0.5');

    await user.type(input, '{End}');
    expect(input).toHaveValue('100');

    await user.type(input, '{Home}');
    expect(input).toHaveValue('0');
  });
});
