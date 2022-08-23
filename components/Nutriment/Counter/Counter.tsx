import { useEffect, useState } from 'react';
import { IconMinusVertical } from '@tabler/icons';
import CounterInput from './CounterInput';

interface CounterProps {
  initialValue?: string;
  total: number;
  foodId: string;
  date?: Date;
}

function Counter({ initialValue, total, ...props }: CounterProps) {
  const [serving, setServing] = useState<string>('');

  useEffect(() => {
    setServing(initialValue ?? '');
  }, [initialValue]);

  const updateServing = (value: string) => {
    if (!props.date) return;

    (async () => {
      const updated = await fetch('/api/servings', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodId: props.foodId,
          date: props.date,
          quantity: value,
        }),
      });
      const json = await updated.json();

      console.log(json);
      setServing(json.quantity);
    })();
  };

  return (
    <div>
      <CounterInput value={serving} setValue={updateServing} />
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
