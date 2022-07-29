export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  const dateOptions = options || {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', dateOptions);
}

export function getPreviousDate(date: Date) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
}

export function getNextDate(date: Date) {
  const next = new Date(date.getTime());
  next.setDate(date.getDate() + 1);

  return next;
}

export default { formatDate, getPreviousDate, getNextDate };
