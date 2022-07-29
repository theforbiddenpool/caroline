export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  const dateOptions = options || {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', dateOptions);
}

export default { formatDate };
