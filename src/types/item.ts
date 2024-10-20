export interface Item {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'misc';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  icon: string;
}

export interface Inventory {
  items: Item[];
  gold: number;
  capacity: number;
}