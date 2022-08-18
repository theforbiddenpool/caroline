import { useEffect, useState } from 'react';
import { IconMinusVertical } from '@tabler/icons';
import CounterInput from './CounterInput';

interface CounterProps {
  initialValue?: string | null;
  total: number;
}

function Counter({ initialValue, total }: CounterProps) {
  const [serving, setServing] = useState<string>('');

  useEffect(() => {
    setServing(initialValue ?? '');
  }, [initialValue]);

  return (
    <div>
      <CounterInput value={serving} setValue={setServing} />
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
