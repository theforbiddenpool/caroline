import { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { formatDate, getNextDate, getPreviousDate } from './date';

function DateSelector() {
  const [current, setCurrent] = useState(new Date());

  function handlePrevious() {
    setCurrent(getPreviousDate(current));
  }

  function handleNext() {
    setCurrent(getNextDate(current));
  }

  return (
    <nav className="flex justify-end p-3 bg-lime-200">
      <button type="button" onClick={handlePrevious} className="align-middle p-1" aria-label="previous">
        <IconChevronLeft size={15} className="" role="presentation" />
      </button>
      <span className="text-center min-w-100 mx-1">{formatDate(current)}</span>
      <button type="button" onClick={handleNext} className="align-middle p-1" aria-label="next">
        <IconChevronRight size={15} className="align-bottom" role="presentation" />
      </button>
    </nav>
  );
}

export default DateSelector;
