import React from 'react';
import { Item } from '../types/item';
import { Shield, Sword, Beaker, Package } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { useFloating, useInteractions, useHover, offset, shift, FloatingPortal, arrow } from '@floating-ui/react';

interface InventorySlotProps {
  item: Item | null;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const InventorySlot: React.FC<InventorySlotProps> = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INVENTORY_ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'INVENTORY_ITEM',
    drop: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const arrowRef = React.useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [
      offset(10),
      shift(),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const getIcon = () => {
    if (!item) return null;
    switch (item.type) {
      case 'weapon':
        return <Sword className="w-5 h-5 text-gray-300" />;
      case 'armor':
        return <Shield className="w-5 h-5 text-gray-300" />;
      case 'potion':
        return <Beaker className="w-5 h-5 text-gray-300" />;
      default:
        return <Package className="w-5 h-5 text-gray-300" />;
    }
  };

  const getRarityColor = () => {
    if (!item) return 'bg-gray-800';
    switch (item.rarity) {
      case 'common':
        return 'bg-gray-700';
      case 'uncommon':
        return 'bg-green-700';
      case 'rare':
        return 'bg-blue-700';
      case 'epic':
        return 'bg-purple-700';
      case 'legendary':
        return 'bg-yellow-700';
    }
  };

  return (
    <>
      <div
        ref={(node) => drag(drop(refs.setReference(node)))}
        {...getReferenceProps()}
        className={`w-12 h-12 border ${
          isOver ? 'border-blue-500' : 'border-gray-600'
        } rounded flex items-center justify-center cursor-move ${getRarityColor()} ${
          isDragging ? 'opacity-50' : 'opacity-100'
        } transition-all duration-200 hover:scale-105`}
      >
        {item ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {getIcon()}
            {item.quantity > 1 && (
              <span className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {item.quantity}
              </span>
            )}
          </div>
        ) : null}
      </div>
      {item && isTooltipOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-gray-900 text-white p-2 rounded shadow-lg z-50 max-w-xs"
          >
            <div className="font-bold text-sm mb-1">{item.name}</div>
            <div className="text-xs text-gray-300 mb-1">{item.description}</div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Type: {item.type}</span>
              <span className={`font-semibold ${getRarityColor()} px-1 rounded`}>
                {item.rarity}
              </span>
            </div>
            <div
              ref={arrowRef}
              className="absolute bg-gray-900 w-2 h-2 rotate-45"
              style={{
                left: 'calc(50% - 4px)',
                bottom: '-4px',
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default InventorySlot;