import type { Food } from '@prisma/client';
import type { Servings } from '../../types';
import Counter from './Counter/Counter';

interface NutrimentProps {
  data: Food;
  serving?: Servings[]
}

function Nutriment({ data, serving }: NutrimentProps) {
  return (
    <div className="flex bg-zinc-50 p-5">
      <h3 className="flex-grow capitalize">{data.name}</h3>
      <Counter initialValue={serving?.[0]?.quantity} total={data.quantity} />
    </div>
  );
}

export default Nutriment;
