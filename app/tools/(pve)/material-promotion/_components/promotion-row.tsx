'use client';
import { CurrencyDisplay } from '@/components/atoms/currency-display';
import { ItemIcon } from '@/components/atoms/item-icon';
import type { PromotionResult } from '@/hooks/use-material-promotion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PromotionRowProps {
  result: PromotionResult;
}

const RecipeItem = ({
  icon,
  name,
  qty,
  priceObj,
  unitPrice,
}: {
  icon: string;
  name: string;
  qty: number;
  priceObj?: { buy: number; sell: number };
  unitPrice?: number;
}) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-help hover:bg-zinc-800/50 p-0.5 rounded transition-colors">
          <ItemIcon src={icon} alt={name} />
          <span className="text-muted-foreground text-xs font-mono">
            ×{qty}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-zinc-950 border-zinc-800 p-3 min-w-56 shadow-2xl">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-sm text-zinc-100 border-b border-zinc-800 pb-2 flex items-center gap-2">
            <ItemIcon src={icon} alt={name} size={20} />
            {name}
          </div>

          {priceObj ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                <span className="text-zinc-500">Unit Buy (Instant):</span>
                <div className="text-right">
                  <CurrencyDisplay copper={priceObj.sell} />
                </div>
                <span className="text-zinc-500">Unit Buy (Order):</span>
                <div className="text-right">
                  <CurrencyDisplay copper={priceObj.buy} />
                </div>
              </div>

              {qty > 1 && (
                <div className="pt-2 border-t border-zinc-800/60 mt-1">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className="text-zinc-300">
                      {qty}x Total (curr. mode):
                    </span>
                    <CurrencyDisplay copper={(unitPrice || 0) * qty} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-[11px] text-zinc-500 italic">
              Account Bound / No price data
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export const PromotionRow = ({ result }: PromotionRowProps) => {
  const isProfitable = result.profit > 0;

  return (
    <div className="group grid grid-cols-[1fr_auto] md:grid-cols-[3.75fr_1.2fr_1.2fr_1.2fr_1.2fr] items-center gap-3 md:gap-4 px-4 py-3 rounded-lg border bg-card hover:bg-card/40 transition-all duration-200">
      {/* Recipe */}
      <div className="flex items-center gap-2 flex-wrap col-span-2 md:col-span-1">
        {/* Input */}
        <RecipeItem
          icon={result.inputIcon}
          name={result.inputName}
          qty={result.inputQty}
          priceObj={result.inputPriceObj}
          unitPrice={result.inputUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* 1× Output item (required as ingredient) */}
        <RecipeItem
          icon={result.outputIcon}
          name={result.outputName}
          qty={1}
          priceObj={result.outputPriceObj}
          unitPrice={result.outputUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* Catalyst (Dust of output tier, or Mystic Crystal for Dust family) */}
        <RecipeItem
          icon={result.catalystIcon}
          name={result.catalystName}
          qty={result.catalystQty}
          priceObj={result.catalystPriceObj}
          unitPrice={result.catalystUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* Philosopher's Stone */}
        <RecipeItem
          icon={result.philoStoneIcon}
          name={
            result.outputTier >= 6 ? "Philosopher's Stone" : 'Mystic Crystal'
          }
          qty={result.philoStones}
        />

        <span className="text-muted-foreground mx-1">≈</span>

        {/* Output */}
        <div className="flex items-center gap-1.5 transition-transform group-hover:scale-105 duration-200">
          <ItemIcon src={result.outputIcon} alt={result.outputName} />
          <span className="text-emerald-500 text-xs font-bold font-mono bg-emerald-950/20 px-1 rounded">
            ×{result.expectedYield}
          </span>
        </div>
      </div>

      {/* Material name */}
      <div className="hidden md:flex flex-col">
        <span className="text-sm text-primary font-medium truncate max-w-[150px]">
          {result.outputName}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-tight">
          {result.familyName}
        </span>
      </div>

      {/* Cost */}
      <div className="hidden md:flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Cost
        </span>
        <CurrencyDisplay copper={result.totalCost} />
      </div>

      {/* Value Change */}
      <div className="hidden md:flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Revenue
        </span>
        <CurrencyDisplay copper={result.totalRevenue} />
      </div>

      {/* Profit */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5 hidden md:block">
          Profit
        </span>
        <div className="flex items-center gap-1.5">
          {isProfitable ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          )}
          <CurrencyDisplay
            copper={result.profit}
            className={
              isProfitable ? 'text-emerald-400 font-semibold' : 'text-red-400'
            }
          />
        </div>
        <span
          className={`text-[10px] font-mono font-bold ${isProfitable ? 'text-emerald-500' : 'text-red-500/70'}`}
        >
          {result.profitPercentage >= 0 ? '+' : ''}
          {result.profitPercentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
