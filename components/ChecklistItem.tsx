
import React from 'react';
import { ChecklistItemData } from '../types';

interface ChecklistItemProps {
  item: ChecklistItemData;
  onToggle: (id: number) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(item.id)}
      className="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-300 ${item.completed ? 'bg-amber-400 border-amber-400' : 'border-gray-300'}`}>
        {item.completed && <i className="fas fa-check text-white text-xs transform scale-110"></i>}
      </div>
      <span className={`flex-grow transition-colors duration-300 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
        {item.text}
      </span>
    </div>
  );
};

export default ChecklistItem;
