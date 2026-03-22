export interface GW2Item {
  id: number;
  name: string;
  type: string;
  level: number;
  rarity: string;
  vendor_value: number;
  game_types: string[];
  flags: string[];
  restrictions: string[];
  chat_link: string;
  icon: string;
}

export interface GW2Price {
  id: number;
  whitelisted: boolean;
  buys: { quantity: number; unit_price: number };
  sells: { quantity: number; unit_price: number };
}
