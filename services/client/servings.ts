import type { Food } from '@prisma/client';
import type { Serving } from '../../types';

function parseServing(data: object[]): Serving[];
function parseServing(data: object): Serving;

function parseServing(data: object | object[]) {
  const parse = (d: any): Serving => ({
    id: d.id,
    foodId: d.foodId,
    date: new Date(d.date),
    quantity: d.quantity || d.quantity === 0 ? String(d.quantity) : '',
  });

  if (Array.isArray(data)) {
    return data.map(parse);
  }
  return parse(data);
}

export async function getServings(date: Date): Promise<Serving[]> {
  const query = new URLSearchParams({
    date: date.toISOString(),
  });

  const res = await fetch(`/api/servings?${query}`);
  const json = await res.json();

  if (!res.ok || (!Array.isArray(json) && 'error' in json)) {
    throw new Error(json.error);
  }

  return parseServing(json as object[]);
}

interface UpdateServingPrpos {
  foodId: Food['id'];
  date: Serving['date']
  quantity: Serving['quantity']
}

export async function updateServing(data: UpdateServingPrpos): Promise<Serving> {
  const res = await fetch('/api/servings', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      foodId: data.foodId,
      date: data.date,
      quantity: data.quantity,
    }),
  });

  const json = await res.json();

  if (!res.ok || (!Array.isArray(json) && 'error' in json)) {
    throw new Error(json.error);
  }

  return parseServing(json as object);
}

export default { getServings };
