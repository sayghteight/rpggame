import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { gameZones } from '../game/zones';
import { enemies } from '../game/enemies';
import { GameState, Enemy } from '../game/types';

const initialGameState: GameState = {
  currentZone: 'town',
  playerPosition: { x: 2, y: 2 },
  messages: ['Bienvenido a nuestro MMORPG de texto! Escribe "help" para ver los comandos disponibles.'],
  player: {
    name: 'Héroe',
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    experience: 0,
    level: 1,
  },
  currentEnemy: null,
};

const GameView: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.messages]);

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let newMessages = [...gameState.messages];
    let newPosition = { ...gameState.playerPosition };
    let newZone = gameState.currentZone;
    let newPlayer = { ...gameState.player };
    let newEnemy = gameState.currentEnemy;

    const currentZoneData = gameZones[gameState.currentZone];

    switch (lowerCommand) {
      case 'north':
      case 'n':
      case 'south':
      case 's':
      case 'east':
      case 'e':
      case 'west':
      case 'w':
        const [newPos, message] = handleMovement(lowerCommand, newPosition, currentZoneData);
        newPosition = newPos;
        newMessages.push(message);
        if (message.includes('entras en')) {
          const zoneName = message.split('entras en ')[1].slice(0, -1);
          newZone = Object.keys(gameZones).find(key => gameZones[key].name === zoneName) || newZone;
        }
        break;
      case 'look':
        newMessages.push(describeLocation(newZone, newPosition));
        break;
      case 'status':
        newMessages.push(getPlayerStatus(newPlayer));
        break;
      case 'attack':
        if (newEnemy) {
          const [battleResult, updatedPlayer, updatedEnemy] = handleCombat(newPlayer, newEnemy);
          newMessages.push(battleResult);
          newPlayer = updatedPlayer;
          newEnemy = updatedEnemy;
          if (newEnemy.health <= 0) {
            newMessages.push(`Has derrotado al ${newEnemy.name}!`);
            newEnemy = null;
          }
        } else {
          newMessages.push('No hay ningún enemigo para atacar.');
        }
        break;
      case 'help':
        newMessages.push('Comandos disponibles: north (n), south (s), east (e), west (w), look, status, attack, help');
        break;
      default:
        newMessages.push('Comando desconocido. Escribe "help" para ver los comandos disponibles.');
    }

    if (!newEnemy && Math.random() < 0.3) {
      const possibleEnemies = gameZones[newZone].enemies;
      if (possibleEnemies.length > 0) {
        const randomEnemy = possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
        newEnemy = { ...enemies[randomEnemy] };
        newMessages.push(`Un ${newEnemy.name} aparece! Prepárate para el combate!`);
      }
    }

    setGameState({
      ...gameState,
      currentZone: newZone,
      playerPosition: newPosition,
      messages: newMessages,
      player: newPlayer,
      currentEnemy: newEnemy,
    });
  };

  const handleMovement = (direction: string, position: { x: number; y: number }, zoneData: typeof gameZones[keyof typeof gameZones]) => {
    const { x, y } = position;
    let newX = x;
    let newY = y;
    let message = '';

    switch (direction) {
      case 'north':
      case 'n':
        newY = y - 1;
        break;
      case 'south':
      case 's':
        newY = y + 1;
        break;
      case 'east':
      case 'e':
        newX = x + 1;
        break;
      case 'west':
      case 'w':
        newX = x - 1;
        break;
    }

    if (zoneData.map[newY][newX] === '#') {
      message = `No puedes ir al ${direction === 'n' ? 'norte' : direction === 's' ? 'sur' : direction === 'e' ? 'este' : 'oeste'}.`;
      return [position, message];
    }

    const exitDirection = direction.toUpperCase().charAt(0);
    if (zoneData.map[newY][newX] === exitDirection) {
      const exit = zoneData.exits[exitDirection];
      message = `Te mueves al ${direction === 'n' ? 'norte' : direction === 's' ? 'sur' : direction === 'e' ? 'este' : 'oeste'} y entras en ${gameZones[exit.zone].name}.`;
      return [{ x: exit.x, y: exit.y }, message];
    }

    message = `Te mueves al ${direction === 'n' ? 'norte' : direction === 's' ? 'sur' : direction === 'e' ? 'este' : 'oeste'}.`;
    return [{ x: newX, y: newY }, message];
  };

  const handleCombat = (player: GameState['player'], enemy: Enemy): [string, GameState['player'], Enemy] => {
    const playerDamage = Math.max(0, player.attack - enemy.defense);
    const enemyDamage = Math.max(0, enemy.attack - player.defense);
    
    enemy.health -= playerDamage;
    player.health -= enemyDamage;

    const battleResult = `Atacas al ${enemy.name} y le haces ${playerDamage} de daño. ` +
                         `El ${enemy.name} te ataca y te hace ${enemyDamage} de daño.`;

    if (enemy.health <= 0) {
      player.experience += enemy.experience;
      if (player.experience >= player.level * 100) {
        player.level++;
        player.maxHealth += 10;
        player.health = player.maxHealth;
        player.attack += 2;
        player.defense += 1;
        return [`${battleResult} Has subido al nivel ${player.level}!`, player, enemy];
      }
    }

    return [battleResult, player, enemy];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const describeLocation = (zone: string, position: { x: number; y: number }) => {
    const zoneData = gameZones[zone];
    const { x, y } = position;
    let description = `Estás en ${zoneData.name}. ${zoneData.description}\n`;
    
    if (zoneData.map[y - 1][x] === 'N' || zoneData.map[y - 1][x] === '.') description += 'Hay un camino al norte. ';
    if (zoneData.map[y + 1][x] === 'S' || zoneData.map[y + 1][x] === '.') description += 'Hay un camino al sur. ';
    if (zoneData.map[y][x + 1] === 'E' || zoneData.map[y][x + 1] === '.') description += 'Hay un camino al este. ';
    if (zoneData.map[y][x - 1] === 'W' || zoneData.map[y][x - 1] === '.') description += 'Hay un camino al oeste. ';
    
    return description;
  };

  const getPlayerStatus = (player: GameState['player']) => {
    return `Nombre: ${player.name} | Nivel: ${player.level} | Salud: ${player.health}/${player.maxHealth} | Experiencia: ${player.experience} | Ataque: ${player.attack} | Defensa: ${player.defense}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 h-[600px] flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4 space-y-2">
        {gameState.messages.map((message, index) => (
          <div key={index} className="text-gray-300">
            {message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none"
          placeholder="Ingresa un comando..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default GameView;