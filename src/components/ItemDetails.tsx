import React from 'react';
import { Item } from '../types/item';
import { X } from 'lucide-react';

interface ItemDetailsProps {
  item: Item | null;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{item.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-semibold">Type:</span> {item.type}
          </div>
          <div>
            <span className="font-semibold">Rarity:</span> {item.rarity}
          </div>
          <div>
            <span className="font-semibold">Quantity:</span> {item.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;