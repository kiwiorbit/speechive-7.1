import React from 'react';
import Card from './Card';
import { Page } from '../types';

interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const dashboardItems = [
    { page: Page.Checklist, icon: 'fas fa-tasks', title: 'Daily Checklist', subtitle: 'Complete tasks', colors: 'bg-sky-100 text-sky-500' },
    { page: Page.Progress, icon: 'fas fa-chart-pie', title: 'View Progress', subtitle: 'Track milestones', colors: 'bg-rose-100 text-rose-500' },
    { page: Page.Badges, icon: 'fas fa-trophy', title: 'Reward Badges', subtitle: 'Achievements', colors: 'bg-indigo-100 text-indigo-500' },
    { page: Page.Resources, icon: 'fas fa-book-reader', title: 'Resources', subtitle: 'Articles & videos', colors: 'bg-green-100 text-green-500' },
    { page: Page.HoneyStore, icon: 'fas fa-store', title: 'Honey Store', subtitle: 'Redeem drops', colors: 'bg-amber-100 text-amber-500' },
    { page: Page.Help, icon: 'fas fa-question-circle', title: 'Help & Settings', subtitle: 'FAQ & reset', colors: 'bg-gray-100 text-gray-500' },
  ];

  return (
    <div className="flex flex-col h-full animate-fadeIn space-y-4 md:space-y-8">
      {/* Main Card */}
      <Card 
        className="!p-4 md:!p-8 bg-amber-50 border-l-4 border-amber-400 flex flex-col justify-center min-h-[120px] md:min-h-[180px] animate-pulse-border" 
        onClick={() => setActivePage(Page.Strategies)}
        disableHoverScale={true}
      >
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <p className="text-xs font-bold text-amber-600 tracking-wider md:text-lg">START HERE</p>
                <h3 className="text-xl font-bold text-gray-800 md:text-4xl">30-Day Challenge</h3>
                <p className="text-xs text-gray-500 mt-1 md:text-lg">Tap to begin your journey of daily activities.</p>
            </div>
            <div className="flex-shrink-0 w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-amber-100 ml-3">
                <i className="fas fa-rocket text-amber-500 text-3xl md:text-6xl animate-rocket-launch"></i>
            </div>
        </div>
      </Card>

      {/* Grid of 6 */}
      <div className="flex-grow grid grid-cols-2 gap-3 md:gap-8">
        {dashboardItems.map(item => (
            <Card key={item.title} onClick={() => setActivePage(item.page)}>
                <div className="flex flex-col items-center text-center justify-center h-full">
                    <div className={`w-10 h-10 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 ${item.colors.split(' ')[0]}`}>
                        <i className={`${item.icon} text-xl md:text-4xl ${item.colors.split(' ')[1]}`}></i>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm text-gray-800 md:text-xl md:font-bold">{item.title}</h4>
                        <p className="text-xs text-gray-500 md:text-base">{item.subtitle}</p>
                    </div>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;