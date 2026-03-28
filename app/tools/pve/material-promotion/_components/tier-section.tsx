import { CurrencyDisplay } from '@/components/atoms/currency-display';
import type { PromotionResult } from '@/hooks/use-material-promotion';
import { PromotionRow } from './promotion-row';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TierSectionProps {
  inputTier: number;
  outputTier: number;
  results: PromotionResult[];
  defaultOpen?: boolean;
}

export const TierSection = ({
  inputTier,
  outputTier,
  results,
  defaultOpen,
}: TierSectionProps) => {
  const profitableCount = results.filter((r) => r.profit > 0).length;
  const totalProfit = results.reduce((sum, r) => sum + r.profit, 0);

  return (
    <Collapsible className="space-y-3" defaultOpen={defaultOpen}>
      {/* Section Header */}
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between gap-1 md:gap-2 @container cursor-pointer">
          <div className="flex items-start lg:items-center justify-between flex-1 flex-col gap-1 @[620px]:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded bg-primary text-secondary border border-primary/50">
                  T{inputTier}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded border border-primary/50">
                  T{outputTier}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground">
                Fine Materials Tier {inputTier} → Tier {outputTier}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                <span className="text-emerald-500 font-medium">
                  {profitableCount}
                </span>
                /{results.length} profitable
              </span>
              <Badge size="lg" variant={totalProfit >= 0 ? 'green' : 'red'}>
                Σ <CurrencyDisplay copper={totalProfit} />
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <ChevronsUpDownIcon className="size-4" />
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {/* Table header (desktop) */}
        <div className="hidden lg:grid lg:grid-cols-[3.75fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-4 px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-widest font-medium border-b ">
          <span>Recipe</span>
          <span>Result</span>
          <span className="text-right">Cost</span>
          <span className="text-right">Revenue</span>
          <span className="text-right">Profit</span>
        </div>

        {/* Rows */}
        <div className="space-y-1.5 mt-3">
          {results
            .sort((a, b) => b.profit - a.profit)
            .map((result) => (
              <PromotionRow
                key={`${result.familyName}-${result.outputTier}`}
                result={result}
              />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
