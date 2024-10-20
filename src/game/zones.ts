import { GameZone } from './types';

export const gameZones: { [key: string]: GameZone } = {
  town: {
    name: "Aldea del Inicio",
    description: "Una pequeña aldea rodeada de murallas de madera. El ajetreo de los habitantes llena el aire.",
    map: [
      ['#', '#', '#', '#', '#'],
      ['#', '.', '.', '.', '#'],
      ['#', '.', 'F', '.', 'E'],
      ['#', '.', '.', '.', '#'],
      ['#', '#', '#', 'S', '#'],
    ],
    exits: {
      E: { zone: 'forest', x: 1, y: 2 },
      S: { zone: 'fields', x: 2, y: 1 },
    },
    enemies: [],
  },
  forest: {
    name: "Bosque Susurrante",
    description: "Un denso bosque con árboles altos y antiguos. Se escuchan sonidos misteriosos en la distancia.",
    map: [
      ['#', '#', '#', '#', '#'],
      ['#', '.', '.', '.', '#'],
      ['W', '.', '.', '.', '#'],
      ['#', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#'],
    ],
    exits: {
      W: { zone: 'town', x: 4, y: 2 },
    },
    enemies: ['Lobo', 'Bandido'],
  },
  fields: {
    name: "Campos Dorados",
    description: "Vastos campos de trigo dorado se extienden hasta donde alcanza la vista.",
    map: [
      ['#', '#', 'N', '#', '#'],
      ['#', '.', '.', '.', '#'],
      ['#', '.', '.', '.', '#'],
      ['#', '.', '.', '.', '#'],
      ['#', '#', '#', '#', '#'],
    ],
    exits: {
      N: { zone: 'town', x: 3, y: 3 },
    },
    enemies: ['Jabalí', 'Serpiente'],
  },
};