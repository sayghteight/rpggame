import React from 'react';
import InventorySlot from './InventorySlot';
import { Inventory, Item } from '../types/item';
import { Coins } from 'lucide-react';

interface InventoryGridProps {
  inventory: Inventory;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ inventory, moveItem }) => {
  const slots = Array(inventory.capacity).fill(null);
  inventory.items.forEach((item, index) => {
    slots[index] = item;
  });

  return (
    <div>
      <div className="flex justify-end items-center mb-2">
        <Coins className="w-5 h-5 text-yellow-400 mr-1" />
        <span className="text-lg font-semibold">{inventory.gold}</span>
      </div>
      <div className="grid grid-cols-6 gap-2 bg-gray-700 rounded-lg p-2">
        {slots.map((item, index) => (
          <InventorySlot
            key={index}
            item={item}
            index={index}
            moveItem={moveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryGrid;