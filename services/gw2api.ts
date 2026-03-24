import type { GW2Item, GW2Price } from '@/types/gw2';

const BASE_URL = 'https://api.guildwars2.com/v2';
const LANG = `&lang=en`;

export const fetchPrices = async (
  ids: number[],
): Promise<GW2Price[] | null> => {
  if (ids.length === 0) return null;

  const response = await fetch(
    `${BASE_URL}/commerce/prices?ids=${ids.join(',')}${LANG}`,
  );
  if (!response.ok) throw new Error('Error fetching GW2 prices');
  return response.json();
};

export const fetchItems = async (ids: number[]): Promise<GW2Item[] | null> => {
  if (ids.length === 0) return null;

  const response = await fetch(`${BASE_URL}/items?ids=${ids.join(',')}${LANG}`);
  if (!response.ok) throw new Error('Error fetching GW2 items');
  return response.json();
};
