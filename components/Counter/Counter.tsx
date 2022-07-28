import React, { useState } from 'react';
import { IconMinus, IconMinusVertical, IconPlus } from '@tabler/icons';

interface CounterProps {
  total: number;
}

function Counter({ total }: CounterProps) {
  const [serving, setServing] = useState<number | ''>('');

  function handleKeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (String(serving).length === 1) {
        setServing('');
      } else {
        setServing(Number(e.currentTarget.value));
      }
    }

    if (/\b[a-z]\b/i.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setServing(Number(e.currentTarget.value));
  }

  return (
    <div>
      <span>
        <button type="button" aria-label="decrement"><IconMinus size={13} role="presentation" /></button>
        <input
          type="number"
          value={serving}
          onChange={handleChange}
          onKeyDown={handleKeypress}
          step="0.5"
          className="w-14 mx-3 text-center border-2 border-gray-900"
          aria-label="servings"
        />
        <button type="button" aria-label="increment"><IconPlus size={13} role="presentation" /></button>
      </span>
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
