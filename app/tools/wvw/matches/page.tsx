import { fetchWvWMatch } from '@/services/gw2api';
import REGION_NAMES from '@/data/region-names-static-list.json';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MinusIcon, MoveDownIcon, MoveUpIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { HeaderSection } from './_components/header-section';
import { HowItWorks } from './_components/how-it-works';

const regionNamesMap = REGION_NAMES as Record<string, { en: string }>;

const getRegionName = (id: string): string => {
  return regionNamesMap[`1${id}`]?.en || id;
};

const NA_MATCHES = ['1-1', '1-2', '1-3', '1-4'];

type TeamColor = 'red' | 'blue' | 'green';

interface MatchTeamRow {
  key: string;
  tier: number;
  teamColor: TeamColor;
  teamName: string;
  totalWarScore: number;
  currentSkirmishScore: number;
  kills: number;
  deaths: number;
  kd: number;
  ppk: number;
  vp: number;
  trend: 'up' | 'down' | 'same';
}

const TEAM_COLORS: TeamColor[] = ['green', 'red', 'blue'];

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('de-DE').format(value);
};

const formatPercent = (value: number): string => {
  return `${value.toFixed(2)} %`;
};

const formatRatio = (value: number): string => {
  return value.toFixed(2);
};

const getKdColorClass = (kd: number): string => {
  if (kd > 1) return 'text-emerald-500';
  if (Math.abs(kd - 1) < 1e-9) return 'text-amber-500';
  return 'text-red-500';
};

const getTeamNameColorClass = (teamColor: TeamColor): string => {
  if (teamColor === 'green') return 'text-emerald-500';
  if (teamColor === 'blue') return 'text-blue-500';
  return 'text-red-500';
};

const toTrendSymbol = (trend: MatchTeamRow['trend']): ReactNode => {
  if (trend === 'up')
    return <MoveUpIcon className="size-4 text-emerald-500 ml-auto" />;
  if (trend === 'down')
    return <MoveDownIcon className="size-4 text-red-500 ml-auto" />;
  return <MinusIcon className="size-4 ml-auto" />;
};

const buildRowsForMatch = (
  matchId: string,
  tier: number,
  match: Awaited<ReturnType<typeof fetchWvWMatch>>,
): MatchTeamRow[] => {
  if (!match) return [];

  const latestSkirmish = match.skirmishes.at(-1);

  const vpRanking = [...TEAM_COLORS].sort(
    (a, b) => match.victory_points[b] - match.victory_points[a],
  );
  const skirmishRanking = [...TEAM_COLORS].sort((a, b) => {
    const scoreA = latestSkirmish?.scores[a] ?? 0;
    const scoreB = latestSkirmish?.scores[b] ?? 0;
    return scoreB - scoreA;
  });

  return TEAM_COLORS.map((teamColor) => {
    const totalWarScore = match.scores[teamColor];
    const currentSkirmishScore = latestSkirmish?.scores[teamColor] ?? 0;
    const kills = match.kills[teamColor];
    const deaths = match.deaths[teamColor];
    const vp = match.victory_points[teamColor];
    const kd = deaths === 0 ? kills : kills / deaths;
    const ppk = kills === 0 ? 0 : (currentSkirmishScore / kills) * 100;

    const vpRank = vpRanking.indexOf(teamColor);
    const skirmishRank = skirmishRanking.indexOf(teamColor);
    const trend: MatchTeamRow['trend'] =
      skirmishRank < vpRank ? 'up' : skirmishRank > vpRank ? 'down' : 'same';

    return {
      key: `${matchId}-${teamColor}`,
      tier,
      teamColor,
      teamName: getRegionName(`${match.worlds[teamColor]}`),
      totalWarScore,
      currentSkirmishScore,
      kills,
      deaths,
      kd,
      ppk,
      vp,
      trend,
    };
  });
};

export default async function MatchesPage() {
  const matches = await Promise.all(
    NA_MATCHES.map((matchId) => fetchWvWMatch(matchId)),
  );

  // TODO: Add TanStackQuery + RefreshButton

  // console.log(matches[1]);

  const rowsByTier = matches
    .map((match, index) => buildRowsForMatch(NA_MATCHES[index], 9999, match))
    .filter((rows) => rows.length > 0);

  return (
    <>
      <HeaderSection />
      <HowItWorks />

      <div className="@container">
        <div className="max-w-6xl mx-auto py-8 md:py-12 lg:py-16">
          <Table>
            <TableHeader>
              <TableRow className="text-xs [&>th]:mb-auto uppercase tracking-widest">
                <TableHead>Tier</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead className="text-right">
                  Current
                  <br /> Skirmish Score
                </TableHead>
                <TableHead className="text-right">Kills</TableHead>
                <TableHead className="text-right">Deaths</TableHead>
                <TableHead className="text-right">K/D</TableHead>
                <TableHead className="text-right">TotalWarScore</TableHead>
                <TableHead className="text-right">PPK</TableHead>
                <TableHead className="text-right">Victory Points</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowsByTier.flatMap((tierRows, tierIndex) => {
                const tierTableRows = tierRows.map((row, index) => (
                  <TableRow key={row.key}>
                    {index === 0 ? (
                      <TableCell rowSpan={tierRows.length}>
                        {row.tier}
                      </TableCell>
                    ) : null}
                    <TableCell className={getTeamNameColorClass(row.teamColor)}>
                      {row.teamName}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(row.currentSkirmishScore)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(row.kills)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(row.deaths)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${getKdColorClass(row.kd)}`}
                    >
                      {formatRatio(row.kd)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(row.totalWarScore)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPercent(row.ppk)}
                    </TableCell>
                    <TableCell className="text-right">{row.vp}</TableCell>
                    <TableCell className="text-right">
                      {toTrendSymbol(row.trend)}
                    </TableCell>
                  </TableRow>
                ));

                return [
                  ...tierTableRows,
                  <TableRow key={`empty-${tierIndex}`} className="h-8">
                    <TableCell colSpan={9} />
                  </TableRow>,
                ];
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
