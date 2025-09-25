import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-top-lg md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`
                flex flex-col items-center justify-center px-3 py-2 rounded-xl 
                transition-all duration-300 ease-in-out focus:outline-none
                ${isActive ? 'bg-amber-100' : 'bg-transparent'}
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <i
                className={`${item.icon} text-xl transition-colors duration-300 ${
                  isActive ? 'text-amber-500' : 'text-gray-400'
                }`}
              ></i>
              <span
                className={`mt-1 text-xs font-semibold transition-colors duration-300 ${
                  isActive ? 'text-amber-600' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;