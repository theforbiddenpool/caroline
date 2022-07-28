import React, { useState } from 'react';
import { IconMinus, IconMinusVertical, IconPlus } from '@tabler/icons';

const NUMBER_REGEX = /^\d+\.?\d*$/;

interface CounterProps {
  total: number;
}

function Counter({ total }: CounterProps) {
  const [serving, setServing] = useState<string>('');

  function handleIncrement() {
    const parsed = parseFloat(serving);

    const nextValue = (serving === '') ? 0.5 : parsed + 0.5;
    setServing(nextValue.toString());
  }

  function handleDecrement() {
    const parsed = parseFloat(serving);

    let nextValue: number;

    if (serving === '') {
      nextValue = 0;
    } else {
      const result = parsed - 0.5;
      nextValue = (result < 0) ? 0 : result;
    }

    setServing(nextValue.toString());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;

    if (value === '') setServing('');
    if (value === '.') setServing(`0${value}`);
    if (!NUMBER_REGEX.test(value)) return;

    setServing(value);
  }

  function handleKeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'ArrowUp':
        handleIncrement();
        break;
      case 'ArrowDown':
        handleDecrement();
        break;
      case 'Home':
        setServing('0');
        break;
      case 'End':
        setServing('100');
        break;
      default:
    }
  }

  return (
    <div>
      <span>
        <button type="button" onClick={handleDecrement} aria-label="decrement">
          <IconMinus size={13} role="presentation" />
        </button>
        <input
          type="text"
          inputMode="decimal"
          value={serving}
          onChange={handleChange}
          onKeyDown={handleKeypress}
          className="w-14 mx-3 text-center border-2 border-gray-900"
          role="spinbutton"
          aria-label="servings"
          aria-valuenow={parseFloat(serving)}
        />
        <button type="button" onClick={handleIncrement} aria-label="increment">
          <IconPlus size={13} role="presentation" />
        </button>
      </span>
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
