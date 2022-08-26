import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dateUtils from './date';
import DateSelector from './DateSelector';

describe('DateSelector', () => {
  test('renders', () => {
    const today = new Date();

    render(<DateSelector date={today} setDate={jest.fn()} />);

    expect(screen.queryByText(dateUtils.formatDate(today), { exact: false }))
      .toBeInTheDocument();
  });

  test('buttons switch the date', async () => {
    const today = new Date();
    const mockFn = jest.fn();

    const { rerender } = render(<DateSelector date={today} setDate={mockFn} />);
    const user = userEvent.setup();

    const previous = dateUtils.getPreviousDate(today);

    await user.click(screen.getByRole('button', { name: 'previous' }));
    expect(mockFn).toHaveBeenCalledWith(previous);

    rerender(<DateSelector date={previous} setDate={mockFn} />);
    expect(screen.queryByText(dateUtils.formatDate(previous), { exact: false }))
      .toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'next' }));
    expect(mockFn).toHaveBeenCalledWith(today);
  });
});
