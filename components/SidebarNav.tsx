import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';
import BeeLogo from './BeeLogo';

interface SidebarNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activePage, setActivePage }) => {
  return (
    <nav className="hidden md:flex flex-col w-80 bg-amber-50 border-r border-amber-200 p-4 space-y-4">
      <div className="flex items-center space-x-3 pb-4 border-b border-amber-200 px-2">
        <BeeLogo className="w-12 h-12 text-amber-500" />
        <h1 className="text-4xl font-bold text-gray-800">
          Speec<span className="text-amber-500">hive</span>
        </h1>
      </div>
      <div className="flex-1 space-y-2 pt-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center space-x-4 w-full text-left p-4 rounded-lg transition-colors duration-200 focus:outline-none ${
                isActive ? 'bg-amber-400 text-white shadow-md' : 'text-gray-600 hover:bg-amber-100'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <i className={`${item.icon} text-4xl w-8 text-center`}></i>
              <span className="font-semibold text-2xl">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;