// src/components/CurrencyDisplay.tsx
import Image from 'next/image'; // Usamos el componente de Next para optimización
import { formatGW2Currency } from '@/lib/api-utils';

interface CurrencyDisplayProps {
  copper: number;
  className?: string;
}

const CoinIcon = ({ type }: { type: 'gold' | 'silver' | 'copper' }) => (
  <Image
    src={`/icons/${type}_coin.png`}
    alt={type}
    width={16}
    height={16}
    className="w-4 h-4 inline-block ml-0.5"
  />
);

export const CurrencyDisplay = ({
  copper,
  className = '',
}: CurrencyDisplayProps) => {
  const currency = formatGW2Currency(copper);
  const sign = currency.isNegative ? '-' : '';

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-sm tabular-nums ${className}`}
    >
      {sign}

      {/* ORO */}
      {currency.gold > 0 && (
        <span className="flex items-center">
          <span className="text-amber-400">
            {currency.gold.toLocaleString()}
          </span>
          <CoinIcon type="gold" />
        </span>
      )}

      {/* PLATA */}
      {(currency.gold > 0 || currency.silver > 0) && (
        <span className="flex items-center">
          <span className="text-stone-400">
            {currency.silver.toString().padStart(2, '0')}
          </span>
          <CoinIcon type="silver" />
        </span>
      )}

      {/* COBRE */}
      <span className="flex items-center">
        <span className="text-orange-300">
          {currency.copper.toString().padStart(2, '0')}
        </span>
        <CoinIcon type="copper" />
      </span>
    </span>
  );
};
