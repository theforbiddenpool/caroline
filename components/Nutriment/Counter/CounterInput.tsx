import { IconMinus, IconPlus } from '@tabler/icons';

const NUMBER_REGEX = /^\d+\.?\d*$/;

interface CounterInputProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}

function CounterInput({ value, setValue, disabled = false }: CounterInputProps) {
  function handleIncrement() {
    const parsed = parseFloat(value);

    const nextValue = (value === '') ? 0.5 : parsed + 0.5;
    setValue(nextValue.toString());
  }

  function handleDecrement() {
    const parsed = parseFloat(value);

    let nextValue: number;

    if (value === '') {
      nextValue = 0;
    } else {
      const result = parsed - 0.5;
      nextValue = (result < 0) ? 0 : result;
    }

    setValue(nextValue.toString());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const eventValue = e.currentTarget.value;

    if (eventValue === '') setValue('');
    if (eventValue === '.') setValue(`0${eventValue}`);
    if (!NUMBER_REGEX.test(eventValue)) return;

    setValue(eventValue);
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
        setValue('0');
        break;
      case 'End':
        setValue('100');
        break;
      default:
    }
  }

  return (
    <span>
      <button type="button" onClick={handleDecrement} title="decrement" aria-label="decrement" disabled={disabled}>
        <IconMinus size={13} role="presentation" />
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeypress}
        className="mx-2 text-center bg-transparent w-8 border-b-2 border-black pb-1"
        role="spinbutton"
        aria-label="servings"
        aria-valuenow={value === '' ? 0 : parseFloat(value)}
      />
      <button type="button" onClick={handleIncrement} title="increment" aria-label="increment" disabled={disabled}>
        <IconPlus size={13} role="presentation" />
      </button>
    </span>
  );
}

export default CounterInput;
