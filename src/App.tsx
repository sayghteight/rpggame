import React, { useState } from 'react';
import InventoryGrid from './components/InventoryGrid';
import GameView from './components/GameView';
import CharacterStats from './components/CharacterStats';
import { Inventory } from './types/item';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const initialInventory: Inventory = {
  items: [
    { id: 1, name: 'Iron Sword', description: 'A sturdy iron sword', type: 'weapon', rarity: 'common', quantity: 1, icon: 'sword' },
    { id: 2, name: 'Health Potion', description: 'Restores 50 HP', type: 'potion', rarity: 'uncommon', quantity: 5, icon: 'flask' },
    { id: 3, name: 'Leather Armor', description: 'Basic protection', type: 'armor', rarity: 'common', quantity: 1, icon: 'shield' },
    { id: 4, name: 'Magic Scroll', description: 'Contains a powerful spell', type: 'misc', rarity: 'rare', quantity: 2, icon: 'scroll' },
  ],
  gold: 1000,
  capacity: 24,
};

const initialCharacterStats = {
  name: 'Hero',
  level: 5,
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  exp: 2500,
  nextLevelExp: 5000,
};

function App() {
  const [inventory, setInventory] = useState<Inventory>(initialInventory);
  const [characterStats, setCharacterStats] = useState(initialCharacterStats);

  const moveItem = (fromIndex: number, toIndex: number) => {
    setInventory((prev) => {
      const newItems = [...prev.items];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return { ...prev, items: newItems };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">RPG Game Browser</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <GameView />
          </div>
          <div className="space-y-8">
            <CharacterStats stats={characterStats} />
            <div className="bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
              <InventoryGrid inventory={inventory} moveItem={moveItem} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;