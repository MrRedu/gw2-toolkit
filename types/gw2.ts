export interface WvWMatch {
  id: string;
  start_time: Date;
  end_time: Date;
  scores: Deaths;
  worlds: Deaths;
  all_worlds: AllWorlds;
  deaths: Deaths;
  kills: Deaths;
  victory_points: Deaths;
  skirmishes: Skirmish[];
  maps: Map[];
}

export interface AllWorlds {
  red: number[];
  blue: number[];
  green: number[];
}

export interface Deaths {
  red: number;
  blue: number;
  green: number;
}

export interface Map {
  id: number;
  type: MapType;
  scores: Deaths;
  bonuses: Bonus[];
  objectives: Objective[];
  deaths: Deaths;
  kills: Deaths;
}

export interface Bonus {
  type: string;
  owner: Owner;
}

export enum Owner {
  Blue = 'Blue',
  Green = 'Green',
  Red = 'Red',
}

export interface Objective {
  id: string;
  type: ObjectiveType;
  owner: Owner;
  last_flipped: Date;
  points_tick: number;
  points_capture: number;
  claimed_by?: null | string;
  claimed_at?: Date | null;
  yaks_delivered?: number;
  guild_upgrades?: number[];
}

export enum ObjectiveType {
  Camp = 'Camp',
  Castle = 'Castle',
  Keep = 'Keep',
  Mercenary = 'Mercenary',
  Ruins = 'Ruins',
  Spawn = 'Spawn',
  Tower = 'Tower',
}

export enum MapType {
  BlueHome = 'BlueHome',
  Center = 'Center',
  GreenHome = 'GreenHome',
  RedHome = 'RedHome',
}

export interface Skirmish {
  id: number;
  scores: Deaths;
  map_scores: MapScore[];
}

export interface MapScore {
  type: MapType;
  scores: Deaths;
}
