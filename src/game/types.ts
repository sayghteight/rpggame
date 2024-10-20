export interface GameState {
  currentZone: string;
  playerPosition: { x: number; y: number };
  messages: string[];
  player: Player;
  currentEnemy: Enemy | null;
}

export interface GameZone {
  name: string;
  description: string;
  map: string[][];
  exits: { [key: string]: { zone: string; x: number; y: number } };
  enemies: string[];
}

export interface Player {
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  experience: number;
  level: number;
}

export interface Enemy {
  name: string;
  health: number;
  attack: number;
  defense: number;
  experience: number;
  level: number;
}