import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { formatDate, getNextDate, getPreviousDate } from './date';

interface DateSelectorProps {
  date: Date;
  setDate: (value: Date) => void;
}

function DateSelector({ date, setDate }: DateSelectorProps) {
  function handlePrevious() {
    setDate(getPreviousDate(date));
  }

  function handleNext() {
    setDate(getNextDate(date));
  }

  return (
    <nav className="flex justify-end p-3 bg-lime-200">
      <button type="button" onClick={handlePrevious} className="align-middle p-1" title="previous day" aria-label="previous day">
        <IconChevronLeft size={15} className="" role="presentation" />
      </button>
      <span className="text-center min-w-100 mx-1">{formatDate(date)}</span>
      <button type="button" onClick={handleNext} className="align-middle p-1" title="next day" aria-label="next day">
        <IconChevronRight size={15} className="align-bottom" role="presentation" />
      </button>
    </nav>
  );
}

export default DateSelector;
