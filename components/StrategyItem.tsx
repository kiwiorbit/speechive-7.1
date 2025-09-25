

import React from 'react';
import { Strategy } from '../types';

interface StrategyItemProps {
  strategy: Strategy;
  onSelect: (strategy: Strategy) => void;
}

const StrategyItem: React.FC<StrategyItemProps> = ({ strategy, onSelect }) => {
  const isCompleted = strategy.completed;

  return (
    <div className={`
      flex items-start space-x-4 p-4 rounded-lg border-l-4 transition-all duration-300
      ${isCompleted ? 'bg-gray-50 border-gray-300' : 'bg-white border-amber-400 shadow-sm'}
    `}>
      <div
        className={`relative flex-shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          strategy.color
        }`}
        aria-label={isCompleted ? `${strategy.title} is complete` : `${strategy.title} is incomplete`}
      >
        {/* The strategy's original icon. It fades out when completed. */}
        <i className={`fas ${strategy.icon} text-white text-xl md:text-4xl transition-opacity duration-300 ${isCompleted ? 'opacity-0' : 'opacity-100'}`}></i>

        {/* The checkmark that appears and animates when completed. */}
        {isCompleted && (
          <div className="absolute inset-0 rounded-full bg-black/10 flex items-center justify-center">
            <i className="fas fa-check text-white text-2xl md:text-4xl checkmark-pop"></i>
          </div>
        )}
      </div>
      <div 
        className={`flex-grow cursor-pointer transition-opacity duration-300 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}
        onClick={() => onSelect(strategy)}
        role="button"
        aria-label={`View details for ${strategy.title}`}
      >
        <h4 className={`font-bold text-gray-800 md:text-2xl transition-all duration-300 ${isCompleted ? 'line-through' : ''}`}>{strategy.title}</h4>
        <p className={`text-sm md:text-xl text-gray-600 transition-all duration-300 ${isCompleted ? 'line-through' : ''}`}>{strategy.description}</p>
      </div>
    </div>
  );
};

export default StrategyItem;