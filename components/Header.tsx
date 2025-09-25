import React from 'react';
import BeeLogo from './BeeLogo';
import { Page } from '../types';

interface HeaderProps {
  onToggleNotifications: () => void;
  unreadCount: number;
  honeyDrops: number;
  setActivePage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleNotifications, unreadCount, honeyDrops, setActivePage }) => {
  return (
    <header className="md:hidden flex-shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center space-x-2">
        <BeeLogo className="w-8 h-8 text-amber-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          Speec<span className="text-amber-500">hive</span>
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button 
            onClick={() => setActivePage(Page.HoneyStore)} 
            className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors focus:outline-none"
            aria-label={`You have ${honeyDrops} Honey Drops. Go to store.`}
        >
            <i className="fas fa-coins text-amber-500 text-lg"></i>
            <span className="font-bold text-amber-700 text-sm">{honeyDrops}</span>
        </button>
        <button onClick={onToggleNotifications} className="relative p-2 text-gray-500 hover:text-amber-500 transition-colors focus:outline-none">
            <i className="fas fa-bell text-xl"></i>
            {unreadCount > 0 && (
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-rose-500"></span>
            )}
        </button>
      </div>
    </header>
  );
};

export default Header;