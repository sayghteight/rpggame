import { Enemy } from './types';

export const enemies: { [key: string]: Enemy } = {
  Lobo: {
    name: 'Lobo',
    health: 30,
    attack: 5,
    defense: 2,
    experience: 20,
    level: 1,
  },
  Bandido: {
    name: 'Bandido',
    health: 40,
    attack: 6,
    defense: 3,
    experience: 30,
    level: 2,
  },
  Jabalí: {
    name: 'Jabalí',
    health: 50,
    attack: 7,
    defense: 4,
    experience: 40,
    level: 3,
  },
  Serpiente: {
    name: 'Serpiente',
    health: 25,
    attack: 8,
    defense: 1,
    experience: 25,
    level: 2,
  },
};