import { useEffect, useState } from 'react';
import { IconCheck, IconMinusVertical } from '@tabler/icons';
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
      if (value.endsWith('.')) {
        setServing(value);
        return;
      }

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
      <IconMinusVertical size={20} stroke={1.5} className="inline mx-1 rotate-12 -mt-1" role="img" aria-label="out of" />
      <span className={(parseFloat(serving) >= total) ? 'text-green-700' : ''}>{total}</span>
      {parseFloat(serving) >= total
        && (
        <span title="serving goal reached">
          <IconCheck size={20} className="inline ml-2 text-green-700" role="img" aria-label="checkmark icon – serving goal reached" />
        </span>
        ) }
    </div>
  );
}

export default Counter;
