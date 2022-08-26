import type { Food } from '@prisma/client';
import type { Serving } from '../../types';
import Counter from './Counter/Counter';

interface NutrimentProps {
  data: Food;
  date: Date;
  serving?: Serving
}

function Nutriment({ data, date, serving }: NutrimentProps) {
  return (
    <div className="flex bg-zinc-50 p-5">
      <h3 className="flex-grow capitalize">{data.name}</h3>
      <Counter
        initialValue={serving?.quantity}
        total={data.quantity}
        foodId={data.id}
        date={date}
      />
    </div>
  );
}

export default Nutriment;
