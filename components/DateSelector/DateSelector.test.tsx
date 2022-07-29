import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dateUtils from './date';
import DateSelector from './DateSelector';

describe('DateSelector', () => {
  test('renders', () => {
    render(<DateSelector />);

    const today = dateUtils.formatDate(new Date());
    expect(screen.queryByText(today, { exact: false })).toBeInTheDocument();
  });

  test('buttons switch the date', async () => {
    render(<DateSelector />);
    const user = userEvent.setup();

    const today = new Date();
    const previous = dateUtils.getPreviousDate(today);

    await user.click(screen.getByRole('button', { name: 'previous' }));
    expect(screen.queryByText(dateUtils.formatDate(previous), { exact: false }))
      .toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'next' }));
    expect(screen.queryByText(dateUtils.formatDate(today), { exact: false }))
      .toBeInTheDocument();
  });
});
