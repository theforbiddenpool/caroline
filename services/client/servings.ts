import type { Serving } from '../../types';

type GetServingsRes = Serving[] & { error: never } | { error: string };

export async function getServings(date: Date): Promise<Serving[]> {
  const query = new URLSearchParams({
    date: date.toISOString(),
  });

  const res = await fetch(`/api/servings?${query}`);
  const json: GetServingsRes = await res.json();

  if (!res.ok || (!Array.isArray(json) && 'error' in json)) {
    throw new Error(json.error);
  }

  const parsed: Serving[] = json.map((d) => ({
    id: d.id,
    foodId: d.foodId,
    date: new Date(d.date),
    quantity: d.quantity ? String(d.quantity) : '',
  }));

  return parsed;
}

export default { getServings };
