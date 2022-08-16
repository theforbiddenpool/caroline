import React, { useState } from 'react';
import { IconMinusVertical } from '@tabler/icons';
import CounterInput from './CounterInput';

interface CounterProps {
  total: number;
}

function Counter({ total }: CounterProps) {
  const [serving, setServing] = useState<string>('');

  return (
    <div>
      <CounterInput value={serving} setValue={setServing} />
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
