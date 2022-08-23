import { useEffect, useState } from 'react';
import { IconMinusVertical } from '@tabler/icons';
import CounterInput from './CounterInput';
import { updateServing } from '../../../services/client/servings';

interface CounterProps {
  initialValue?: string;
  total: number;
  foodId: string;
  date: Date;
}

function Counter({ initialValue, total, ...props }: CounterProps) {
  const [serving, setServing] = useState<string>('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setServing(initialValue ?? '');
  }, [initialValue, props.date]);

  const handleServing = (value: string) => {
    (async () => {
      setDisabled(true);
      const updated = await updateServing({
        foodId: props.foodId,
        date: props.date,
        quantity: value,
      });

      setServing(updated.quantity);
      setDisabled(false);
    })();
  };

  return (
    <div>
      <CounterInput value={serving} setValue={handleServing} disabled={disabled} />
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" aria-label="out of" />
      <span>{total}</span>
    </div>
  );
}

export default Counter;
