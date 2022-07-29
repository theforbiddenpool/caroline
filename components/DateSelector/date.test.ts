import { formatDate, getNextDate, getPreviousDate } from './date';

describe('date utils', () => {
  test('date is formatted correctly', () => {
    const date = new Date('2022-07-29');

    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Fri, Jul 29');

    const formattedDateWithOptions = formatDate(date, { weekday: 'long' });
    expect(formattedDateWithOptions).toBe('Friday');
  });

  test('returns the correct previous date', () => {
    const date = new Date('2020-03-12');

    const previous = getPreviousDate(date);
    expect(previous.getDate()).toBe(11);
    expect(previous.getMonth()).toBe(2);
    expect(previous.getFullYear()).toBe(2020);
  });

  test('returns the correct next date', () => {
    const date = new Date('2021-12-31');

    const next = getNextDate(date);
    expect(next.getDate()).toBe(1);
    expect(next.getMonth()).toBe(0);
    expect(next.getFullYear()).toBe(2022);
  });
});
