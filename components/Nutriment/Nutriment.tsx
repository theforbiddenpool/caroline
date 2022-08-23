import type { Food } from '@prisma/client';
import type { Serving } from '../../types';
import Counter from './Counter/Counter';

interface NutrimentProps {
  data: Food;
  serving?: Serving
}

function Nutriment({ data, serving }: NutrimentProps) {
  return (
    <div className="flex bg-zinc-50 p-5">
      <h3 className="flex-grow capitalize">{data.name}</h3>
      <Counter initialValue={serving?.quantity} total={data.quantity} />
    </div>
  );
}

export default Nutriment;
