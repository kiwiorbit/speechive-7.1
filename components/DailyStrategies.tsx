import React from 'react';
import Card from './Card';
import { NaturalisticStrategyType } from '../types';
import { NATURALISTIC_STRATEGIES } from '../constants';

interface DailyStrategiesProps {
  onSelectCategory: (category: NaturalisticStrategyType) => void;
}

const DailyStrategies: React.FC<DailyStrategiesProps> = ({ onSelectCategory }) => {
  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl md:text-5xl font-bold text-gray-800">Naturalistic Strategies</h2>
        <p className="text-gray-500 md:text-xl">Proven techniques to encourage language development in everyday situations.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {NATURALISTIC_STRATEGIES.map((strategy) => (
          <Card 
            key={strategy.type} 
            onClick={() => onSelectCategory(strategy.type)} 
            className="text-center !p-4 md:!p-6 flex flex-col items-center justify-start h-full"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${strategy.color} mb-2 md:mb-4 text-white flex-shrink-0`}>
              <i className={`${strategy.icon} text-2xl md:text-3xl`}></i>
            </div>
            <h3 className="font-bold text-base md:text-lg text-gray-800">{strategy.title}</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{strategy.description}</p>
          </Card>
        ))}
      </div>
       <div className="mt-6 text-sm bg-amber-50 p-4 rounded-lg text-amber-800">
          <p><i className="fas fa-info-circle mr-2"></i>
          Select a category to begin a 30-day challenge focused on mastering that specific strategy through daily, playful activities.</p>
      </div>
    </div>
  );
};

export default DailyStrategies;
