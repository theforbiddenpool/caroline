import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { formatDate } from './date';

function DateSelector() {
  return (
    <nav className="flex justify-end p-3 bg-lime-200">
      <button type="button" className="align-middle p-1" aria-label="previous">
        <IconChevronLeft size={15} className="" role="presentation" />
      </button>
      <span className="text-center min-w-100 mx-1">{formatDate(new Date())}</span>
      <button type="button" className="align-middle p-1" aria-label="next">
        <IconChevronRight size={15} className="align-bottom" role="presentation" />
      </button>
    </nav>
  );
}

export default DateSelector;
