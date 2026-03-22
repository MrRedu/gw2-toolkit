'use client';
import { CurrencyDisplay } from '@/components/atoms/currency-display';
import { ItemIcon } from '@/components/atoms/item-icon';
import type { PromotionResult } from '@/hooks/use-material-promotion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { ItemTooltip } from '@/components/molecules/item-tooltip';
import { ID_PHILOSOPHER_STONE, ID_MYSTIC_CRYSTAL } from '@/constants/materials';

interface PromotionRowProps {
  result: PromotionResult;
}

const RecipeItem = ({
  itemId,
  chatLink,
  icon,
  name,
  qty,
  priceObj,
  unitPrice,
}: {
  itemId?: number;
  chatLink?: string;
  icon: string;
  name: string;
  qty: number;
  priceObj?: { buy: number; sell: number };
  unitPrice?: number;
}) => {
  return (
    <ItemTooltip
      itemId={itemId}
      chatLink={chatLink}
      icon={icon}
      name={name}
      qty={qty}
      priceObj={priceObj}
      unitPrice={unitPrice}
    >
      <div className="flex items-center gap-1.5 cursor-help hover:bg-zinc-800/50 p-0.5 rounded transition-colors group/item">
        <ItemIcon src={icon} alt={name} />
        <span className="text-muted-foreground text-xs font-mono">×{qty}</span>
      </div>
    </ItemTooltip>
  );
};

export const PromotionRow = ({ result }: PromotionRowProps) => {
  const isProfitable = result.profit > 0;

  return (
    <div className="group grid grid-cols-3 lg:grid-cols-[3.75fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-3 md:gap-4 px-4 py-3 rounded-lg border bg-card hover:bg-card/40 transition-all duration-200 @container items-start">
      <div className="flex items-center gap-2 flex-wrap col-span-3 lg:col-span-1">
        {/* Input */}
        <RecipeItem
          itemId={result.inputItemId}
          chatLink={result.inputChatLink}
          icon={result.inputIcon}
          name={result.inputName}
          qty={result.inputQty}
          priceObj={result.inputPriceObj}
          unitPrice={result.inputUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* 1× Output item (required as ingredient) */}
        <RecipeItem
          itemId={result.outputItemId}
          chatLink={result.outputChatLink}
          icon={result.outputIcon}
          name={result.outputName}
          qty={1}
          priceObj={result.outputPriceObj}
          unitPrice={result.outputUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* Catalyst (Dust of output tier, or Mystic Crystal for Dust family) */}
        <RecipeItem
          itemId={result.catalystItemId}
          chatLink={result.catalystChatLink}
          icon={result.catalystIcon}
          name={result.catalystName}
          qty={result.catalystQty}
          priceObj={result.catalystPriceObj}
          unitPrice={result.catalystUnitPrice}
        />

        <span className="text-muted-foreground">+</span>

        {/* Philosopher's Stone */}
        <RecipeItem
          itemId={
            result.outputTier >= 6 ? ID_PHILOSOPHER_STONE : ID_MYSTIC_CRYSTAL
          }
          chatLink={
            result.outputTier >= 6
              ? result.philoStoneChatLink
              : result.mysticCrystalChatLink
          }
          icon={result.philoStoneIcon}
          name={
            result.outputTier >= 6 ? "Philosopher's Stone" : 'Mystic Crystal'
          }
          qty={result.philoStones}
        />

        <span className="text-muted-foreground mx-1">≈</span>

        {/* Output */}
        <ItemTooltip
          itemId={result.outputItemId}
          chatLink={result.outputChatLink}
          icon={result.outputIcon}
          name={result.outputName}
          qty={result.expectedYield}
          priceObj={result.outputPriceObj}
          unitPrice={result.outputUnitPrice}
        >
          <div className="flex items-center gap-1.5 transition-transform group-hover:scale-105 duration-200 cursor-help">
            <ItemIcon src={result.outputIcon} alt={result.outputName} />
            <span className="text-emerald-500 text-xs font-bold font-mono bg-emerald-950/20 px-1 rounded">
              ×{result.expectedYield}
            </span>
          </div>
        </ItemTooltip>
      </div>

      {/* Material name */}
      <div className="flex flex-col col-span-3 lg:col-span-1">
        <span className="text-sm text-primary font-medium truncate max-w-[150px]">
          {result.outputName}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-tight">
          {result.familyName}
        </span>
      </div>

      {/* Cost */}
      <div className="flex flex-col items-start lg:items-end col-span-3 @[350px]:col-span-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Cost
        </span>
        <CurrencyDisplay copper={result.totalCost} />
      </div>

      {/* Value Change */}
      <div className="flex flex-col items-start lg:items-end col-span-3 @[350px]:col-span-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Revenue
        </span>
        <CurrencyDisplay copper={result.totalRevenue} />
      </div>

      {/* Profit */}
      <div className="flex flex-col items-start lg:items-end col-span-3 @[350px]:col-span-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
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
