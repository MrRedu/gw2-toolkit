'use client';

import { CurrencyDisplay } from '@/components/atoms/currency-display';
import {
  useMaterialPromotion,
  type PromotionResult,
  type BuyMode,
} from '@/hooks/use-material-promotion';
import {
  RefreshCw,
  AlertTriangle,
  CircleQuestionMarkIcon,
  AnvilIcon,
  ShoppingCart,
  Clock,
} from 'lucide-react';
import { TierSection } from './_components/tier-section';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Loading Skeleton ────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-20 rounded bg-zinc-800" />
            <div className="h-5 w-48 rounded bg-zinc-800" />
          </div>
          {[1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="h-14 rounded-lg bg-zinc-900/60 border border-zinc-800/40"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function MaterialPromotionPage() {
  const [buyMode, setBuyMode] = useState<BuyMode>('sell'); // 'sell' = Instant Buy (default), 'buy' = Buy Order
  const { results, isLoading, isError, isFetching, refetch } =
    useMaterialPromotion(buyMode);

  // Group results by tier upgrade
  const tierGroups = new Map<string, PromotionResult[]>();
  for (const r of results) {
    const key = `${r.inputTier}-${r.outputTier}`;
    if (!tierGroups.has(key)) tierGroups.set(key, []);
    tierGroups.get(key)!.push(r);
  }

  // Sort tier groups: T5→T6 first (usually most profitable)
  const sortedTierGroups = Array.from(tierGroups.entries()).sort(([a], [b]) => {
    const aTier = parseInt(a.split('-')[1]);
    const bTier = parseInt(b.split('-')[1]);
    return bTier - aTier;
  });

  const totalProfit = results.reduce(
    (sum, r) => (r.profit > 0 ? sum + r.profit : sum),
    0,
  );
  const profitableCount = results.filter((r) => r.profit > 0).length;

  return (
    <div className="min-h-screen">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-amber-500/20 to-orange-600/10 border border-amber-700/30">
                  <AnvilIcon className="size-5 text-amber-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Material Promotion
                </h1>
              </div>
              <p className="text-sm text-muted-foreground max-w-lg">
                Mystic Forge fine crafting material upgrade calculator. Prices
                updated in real-time from the GW2 Trading Post.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Buy Mode Toggle */}
              <div className="flex items-center bg-secondary/50 rounded-lg p-1 border border-zinc-800/60">
                <button
                  onClick={() => setBuyMode('buy')}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                    buyMode === 'buy'
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                      : 'text-muted-foreground hover:text-zinc-300',
                  )}
                >
                  <Clock className="size-3" />
                  Buy Order
                </button>
                <button
                  onClick={() => setBuyMode('sell')}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                    buyMode === 'sell'
                      ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                      : 'text-muted-foreground hover:text-zinc-300',
                  )}
                >
                  <ShoppingCart className="size-3" />
                  Instant Buy
                </button>
              </div>

              {/* Refresh button */}
              <Button onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw
                  className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
                />
                {isFetching ? 'Updating…' : 'Refresh Prices'}
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          {!isLoading && !isError && (
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-zinc-800/60">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Total Recipes
                </span>
                <span className="text-sm font-mono text-muted-foreground font-semibold">
                  {results.length}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/30 border border-emerald-900/30">
                <span className="text-[10px] text-emerald-600 uppercase tracking-wider">
                  Profitable
                </span>
                <span className="text-sm font-mono text-emerald-400 font-semibold">
                  {profitableCount}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-950/20 border border-red-900/20">
                <span className="text-[10px] text-red-500/70 uppercase tracking-wider">
                  Unprofitable
                </span>
                <span className="text-sm font-mono text-red-400 font-semibold">
                  {results.length - profitableCount}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-950/20 border border-amber-900/20">
                <span className="text-[10px] text-amber-600 uppercase tracking-wider">
                  Total Potential Profit
                </span>
                <CurrencyDisplay copper={totalProfit} />
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="p-4 rounded-full bg-red-950/30 border border-red-900/30">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-zinc-200">
                Failed to load data
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Could not fetch prices from the GW2 API. Please try again.
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="mt-2 px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-all"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Info banner */}
            <Alert>
              <CircleQuestionMarkIcon />
              <AlertTitle>How it works</AlertTitle>
              <AlertDescription>
                Each recipe converts lower-tier fine crafting materials into
                higher-tier ones using the Mystic Forge. Costs are based on{' '}
                <span
                  className={
                    buyMode === 'buy' ? 'text-amber-300' : 'text-emerald-400'
                  }
                >
                  {buyMode === 'buy'
                    ? 'Buy Orders (placing a bid)'
                    : 'Instant Buy (sell listings)'}
                </span>{' '}
                {'prices for all ingredients. Revenue accounts for the'}{' '}
                <span className="text-amber-300">15% TP tax</span>.{' '}
                {`Philosopher's Stones are crafted from Spirit Shards and are not included in the cost.`}
              </AlertDescription>
            </Alert>

            {sortedTierGroups.map(([key, groupResults]) => {
              const [inputTier, outputTier] = key.split('-').map(Number);
              return (
                <TierSection
                  key={key}
                  inputTier={inputTier}
                  outputTier={outputTier}
                  results={groupResults}
                  defaultOpen={key === '5-6'}
                />
              );
            })}
          </div>
        )}
        {/* Footer note */}
        {/* 
        <footer className="mt-16 pt-8 border-t border-zinc-800/40">
          <p className="text-[11px] text-zinc-600 text-center">
            Prices from the Guild Wars 2 API • 15% Trading Post tax applied •
            Philosopher&apos;s Stones cost not included (Spirit Shards)
          </p>
        </footer> */}
      </div>
    </div>
  );
}
