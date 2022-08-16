import { Food } from '@prisma/client';
import Counter from './Counter/Counter';

interface FoodProps {
  data: Food
}

function Nutriment({ data }: FoodProps) {
  return (
    <div className="flex bg-zinc-50 p-5">
      <h3 className="flex-grow capitalize">{data.name}</h3>
      <Counter total={data.quantity} />
    </div>
  );
}

export default Nutriment;
