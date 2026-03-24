import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/services/gw2api';
import { useDebounce } from './use-debounce';

export const useItemSearch = (query: string) => {
  const debouncedQuery = useDebounce(query.trim(), 500);
  const isNumeric = /^\d+$/.test(debouncedQuery);

  return useQuery({
    queryKey: ['item-search', debouncedQuery],
    queryFn: async () => {
      if (!isNumeric) return [];
      const res = await fetchItems([parseInt(debouncedQuery)]);
      return res ?? [];
    },
    enabled: debouncedQuery.length >= 1,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
};
