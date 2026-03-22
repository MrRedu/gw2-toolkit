import { useQuery } from '@tanstack/react-query';
import { fetchPrices, fetchItems } from '@/services/gw2api';
import { ONE_MINUTE_IN_MS } from '@/constants/general';
import {
  MATERIAL_FAMILIES,
  FINE_MATERIAL_RULES,
  DUST_MATERIAL_RULES,
  type Tier,
} from '@/constants/recipes';
import { ID_PHILOSOPHER_STONE, ID_MYSTIC_CRYSTAL } from '@/constants/materials';
import { GW2_TAX } from '@/lib/api-utils';

// Collect ALL item IDs we need to fetch prices/items for
function getAllItemIds(): number[] {
  const ids = new Set<number>();

  // All material tier IDs
  for (const family of MATERIAL_FAMILIES) {
    for (const id of Object.values(family.tiers)) {
      ids.add(id);
    }
  }

  // Philosopher's Stone and Mystic Crystal
  ids.add(ID_PHILOSOPHER_STONE);
  ids.add(ID_MYSTIC_CRYSTAL);

  return Array.from(ids);
}

export type BuyMode = 'buy' | 'sell';

export interface PromotionResult {
  familyName: string;
  isDust: boolean;
  inputTier: number;
  outputTier: number;
  inputItemId: number;
  outputItemId: number;
  catalystItemId: number; // Dust tier for normal mats, Mystic Crystal for Dust
  inputQty: number;
  catalystQty: number;
  philoStones: number;
  expectedYield: number;
  // Prices (in copper)
  inputUnitPrice: number; // based on BuyMode
  outputUnitPrice: number; // sell listing price (always)
  catalystUnitPrice: number; // based on BuyMode
  // Calculations
  totalCost: number; // cost of all ingredients
  totalRevenue: number; // revenue from selling output (after 15% tax)
  profit: number; // revenue - cost
  profitPercentage: number;
  // Item info
  inputName: string;
  outputName: string;
  catalystName: string;
  inputIcon: string;
  outputIcon: string;
  catalystIcon: string;
  philoStoneIcon: string;
  // Extra info for tooltips
  inputPriceObj?: { buy: number; sell: number };
  outputPriceObj?: { buy: number; sell: number };
  catalystPriceObj?: { buy: number; sell: number };
}

export function useMaterialPromotion(buyMode: BuyMode = 'sell') {
  const allIds = getAllItemIds();

  const pricesQuery = useQuery({
    queryKey: ['material-promotion-prices', allIds],
    queryFn: () => fetchPrices(allIds),
    staleTime: ONE_MINUTE_IN_MS * 5,
    refetchInterval: ONE_MINUTE_IN_MS * 5,
  });

  const itemsQuery = useQuery({
    queryKey: ['material-promotion-items', allIds],
    queryFn: () => fetchItems(allIds),
    staleTime: ONE_MINUTE_IN_MS * 60, // Items don't change often
  });

  const isLoading = pricesQuery.isLoading || itemsQuery.isLoading;
  const isError = pricesQuery.isError || itemsQuery.isError;
  const isFetching = pricesQuery.isFetching;

  const results: PromotionResult[] = [];

  if (pricesQuery.data && itemsQuery.data) {
    const priceMap = new Map(pricesQuery.data.map((p) => [p.id, p]));
    const itemMap = new Map(itemsQuery.data.map((i) => [i.id, i]));

    const philoStoneIcon = itemMap.get(ID_PHILOSOPHER_STONE)?.icon ?? '';

    // Find the dust family for catalyst lookups
    const dustFamily = MATERIAL_FAMILIES.find((f) => f.isDust)!;

    for (const family of MATERIAL_FAMILIES) {
      const rules = family.isDust ? DUST_MATERIAL_RULES : FINE_MATERIAL_RULES;
      const tiers = [2, 3, 4, 5, 6] as Tier[];

      for (const outputTier of tiers) {
        const inputTier = outputTier - 1;
        const rule = rules[outputTier];

        const inputItemId =
          family.tiers[inputTier as keyof typeof family.tiers];
        const outputItemId =
          family.tiers[outputTier as keyof typeof family.tiers];

        // Catalyst: for dust family it's Mystic Crystal, for others it's the dust of the OUTPUT tier
        const catalystItemId = family.isDust
          ? ID_MYSTIC_CRYSTAL
          : dustFamily.tiers[outputTier as keyof typeof dustFamily.tiers];

        const inputPrice = priceMap.get(inputItemId);
        const outputPrice = priceMap.get(outputItemId);
        const catalystPrice = priceMap.get(catalystItemId);
        const inputItem = itemMap.get(inputItemId);
        const outputItem = itemMap.get(outputItemId);
        const catalystItem = itemMap.get(catalystItemId);

        // inputUnitPrice: Sell listing (instant buy) or Buy order (wait)
        const inputUnitPrice =
          buyMode === 'sell'
            ? (inputPrice?.sells?.unit_price ?? 0)
            : (inputPrice?.buys?.unit_price ?? 0);

        // catalystUnitPrice: Same logic as inputs
        const catalystUnitPrice =
          buyMode === 'sell'
            ? (catalystPrice?.sells?.unit_price ?? 0)
            : (catalystPrice?.buys?.unit_price ?? 0);

        // Output value when selling: Best to use Sell listing (placing an order) for high profit
        // Note: Revenue always uses sell listings because it's the standard for calculating "profit potential".
        const outputUnitPrice = outputPrice?.sells?.unit_price ?? 0;

        // Recipe requires: inputQty×inputItem + 1×outputItem (REQUIRED AS INPUT) + catalystQty×catalyst
        // The 1x output item used as input is also bought using buyMode
        const usedOutputInputPrice =
          buyMode === 'sell'
            ? (outputPrice?.sells?.unit_price ?? 0)
            : (outputPrice?.buys?.unit_price ?? 0);

        const totalCost =
          rule.inputQty * inputUnitPrice +
          1 * usedOutputInputPrice +
          rule.catalystQty * catalystUnitPrice;

        const totalRevenue = Math.floor(
          rule.expectedYield * outputUnitPrice * (1 - GW2_TAX),
        );

        const profit = totalRevenue - totalCost;
        const profitPercentage = totalCost > 0 ? (profit / totalCost) * 100 : 0;

        results.push({
          familyName: family.name,
          isDust: family.isDust,
          inputTier,
          outputTier,
          inputItemId,
          outputItemId,
          catalystItemId,
          inputQty: rule.inputQty,
          catalystQty: rule.catalystQty,
          philoStones: rule.philoStones,
          expectedYield: rule.expectedYield,
          inputUnitPrice,
          outputUnitPrice,
          catalystUnitPrice,
          totalCost,
          totalRevenue,
          profit,
          profitPercentage,
          inputName: inputItem?.name ?? `Item ${inputItemId}`,
          outputName: outputItem?.name ?? `Item ${outputItemId}`,
          catalystName: catalystItem?.name ?? `Item ${catalystItemId}`,
          inputIcon: inputItem?.icon ?? '',
          outputIcon: outputItem?.icon ?? '',
          catalystIcon: catalystItem?.icon ?? '',
          philoStoneIcon,
          inputPriceObj: inputPrice
            ? {
                buy: inputPrice.buys.unit_price,
                sell: inputPrice.sells.unit_price,
              }
            : undefined,
          outputPriceObj: outputPrice
            ? {
                buy: outputPrice.buys.unit_price,
                sell: outputPrice.sells.unit_price,
              }
            : undefined,
          catalystPriceObj: catalystPrice
            ? {
                buy: catalystPrice.buys.unit_price,
                sell: catalystPrice.sells.unit_price,
              }
            : undefined,
        });
      }
    }
  }

  // Sort by profit descending
  results.sort((a, b) => b.profit - a.profit);

  return {
    results,
    isLoading,
    isError,
    isFetching,
    refetch: pricesQuery.refetch,
  };
}
