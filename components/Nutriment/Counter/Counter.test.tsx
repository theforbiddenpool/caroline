import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';
import { servings, foods } from '../../../mocks/fixtures';

describe('Counter', () => {
  test('renders', async () => {
    render(<Counter
      initialValue={String(servings.beansTwoServings.quantity)}
      total={foods.beans.quantity}
      foodId={foods.beans.id}
      date={new Date()}
    />);

    expect(screen.queryByText(/3/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/servings/i)).toHaveValue('2');
  });

  test('correctly updates with the API call\'s result', async () => {
    render(<Counter
      initialValue=""
      total={foods.berries.quantity}
      foodId={foods.berries.id}
      date={new Date()}
    />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);
    const incrementButton = screen.getByLabelText(/increment/i);
    const decrementButton = screen.getByLabelText(/decrement/i);

    await user.click(incrementButton);

    // disables input and buttons after clicking
    expect(input).toBeDisabled();
    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();

    await waitFor(() => {
      expect(input).toHaveDisplayValue('0.5');
    });

    // re-enables input and buttons after API request is resolved
    expect(input).toBeEnabled();
    expect(incrementButton).toBeEnabled();
    expect(decrementButton).toBeEnabled();

    await user.click(decrementButton);
    await waitFor(() => {
      expect(input).toHaveDisplayValue('0');
    });
  });

  test('API is not called when decimal point is typed', async () => {
    render(<Counter
      initialValue={String(servings.beansTwoServings.quantity)}
      total={foods.beans.quantity}
      foodId={foods.beans.id}
      date={new Date()}
    />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(/servings/i);

    await user.type(input, '.');
    await waitFor(() => {
      expect(input).toHaveDisplayValue('2.');
    });
  });
});
