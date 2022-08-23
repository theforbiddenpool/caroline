import type { Serving } from '../../types';

export async function getServings(date: Date): Promise<Serving[]> {
  const query = new URLSearchParams({
    date: date.toISOString(),
  });

  const res = await fetch(`/api/servings?${query}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}

export default { getServings };
