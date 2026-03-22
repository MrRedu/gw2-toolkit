import { useQuery } from '@tanstack/react-query';
import { fetchPrices } from '@/services/gw2api';
import { ONE_MINUTE_IN_MS } from '@/constants/general';

export const useItemPrices = (ids: number[]) => {
  return useQuery({
    queryKey: ['prices', ids],
    queryFn: () => fetchPrices(ids),
    staleTime: ONE_MINUTE_IN_MS * 5,
  });
};
