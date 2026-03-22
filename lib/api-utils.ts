/**
 * GW2 Trading Post Taxes:
 * 5% Listing Fee (No reembolsable)
 * 10% Exchange Fee (Solo si se vende)
 */
export const GW2_TAX = 0.15;

export function calculateNetProfit(
  sellPrice: number,
  costPrice: number,
): number {
  const revenue = Math.floor(sellPrice * (1 - GW2_TAX));
  return revenue - costPrice;
}

/**
 * Convierte un valor en cobre a un objeto con oro, plata y cobre.
 * @param {number} totalCopper - El valor bruto de la API.
 * @returns {{gold: number, silver: number, copper: number, isNegative: boolean, toString: () => string}}
 */
export function formatGW2Currency(totalCopper: number): {
  gold: number;
  silver: number;
  copper: number;
  isNegative: boolean;
  toString: () => string;
} {
  const isNegative = totalCopper < 0;
  const abs = Math.abs(totalCopper);

  const gold = Math.floor(abs / 10000);
  const silver = Math.floor((abs % 10000) / 100);
  const copper = abs % 100;

  const sign = isNegative ? '-' : '';

  return {
    gold,
    silver,
    copper,
    isNegative,
    // String formateado: "1,900g 00s 00c" o "-1,900g 00s 00c"
    toString: () =>
      `${sign}${gold.toLocaleString()}g ${silver.toString().padStart(2, '0')}s ${copper.toString().padStart(2, '0')}c`,
  };
}
