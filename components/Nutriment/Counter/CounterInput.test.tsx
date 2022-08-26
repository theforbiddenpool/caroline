import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withState } from '../../../mocks/components';
import CounterInput from './CounterInput';

describe('CounterInput', () => {
  test('renders', () => {
    const CounterInputWithState = withState(CounterInput, { initialValue: '2' });
    render(<CounterInputWithState />);

    const input = screen.queryByLabelText(/servings/i);
    expect(input).toHaveDisplayValue('2');
    expect(input).not.toBeDisabled();
  });

  test('both input and buttons are disabled', () => {
    const CounterInputWithState = withState(CounterInput, { initialValue: '' });
    render(<CounterInputWithState disabled />);

    expect(screen.getByLabelText(/servings/i)).toBeDisabled();
    expect(screen.getByLabelText(/increment/i)).toBeDisabled();
    expect(screen.getByLabelText(/decrement/i)).toBeDisabled();
  });

  test('button increments/decrements value by 0.5', async () => {
    const CounterInputWithState = withState(CounterInput, { initialValue: '' });
    render(<CounterInputWithState />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);
    const incrementButton = screen.getByLabelText(/increment/i);
    const decrementButton = screen.getByLabelText(/decrement/i);

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

  test('only allows numbers', async () => {
    const CounterInputWithState = withState(CounterInput, { initialValue: '' });
    render(<CounterInputWithState />);
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
    const CounterInputWithState = withState(CounterInput, { initialValue: '' });
    render(<CounterInputWithState />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);

    await user.type(input, '.5');
    expect(input).toHaveValue('0.5');
  });

  test('keyboard accessibility', async () => {
    const CounterInputWithState = withState(CounterInput, { initialValue: '' });
    render(<CounterInputWithState />);
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
