import React, { useState } from 'react';
import { Page } from '../types';
import Card from './Card';

interface HoneyStorePageProps {
    setActivePage: (page: Page) => void;
    honeyDrops: number;
    onRedeem: () => void;
}

const HoneyStorePage: React.FC<HoneyStorePageProps> = ({ setActivePage, honeyDrops, onRedeem }) => {
  const [showNzd, setShowNzd] = useState(false);

  const handleToggleCurrency = () => {
    setShowNzd(prev => !prev);
  };

  const nzdValue = ((honeyDrops / 990) * 10).toFixed(2);

  return (
    <div className="flex flex-col h-full animate-fadeIn space-y-4">
        {/* Header */}
        <div className="flex-shrink-0">
            <div className="flex items-center space-x-4">
                <button onClick={() => setActivePage(Page.Dashboard)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to dashboard">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Honey Store</h2>
                    <p className="text-gray-500">Your hard work pays off!</p>
                </div>
            </div>
        </div>

        {/* Balance Card */}
        <Card 
            onClick={handleToggleCurrency}
            className="bg-gradient-to-br from-amber-300 to-yellow-400 text-center !p-8 flex-shrink-0 cursor-pointer"
            aria-label="Tap to toggle between Honey Drops and NZD value"
        >
            <p className="font-semibold text-amber-800 text-xs">YOUR BALANCE</p>
            <div className="flex items-center justify-center space-x-2 mt-1">
                <i className={`fas ${showNzd ? 'fa-dollar-sign' : 'fa-coins'} text-3xl text-white drop-shadow-lg`}></i>
                <span className="text-5xl font-bold text-white drop-shadow-lg">
                    {showNzd ? nzdValue : honeyDrops}
                </span>
            </div>
            <p className="mt-1 text-sm font-bold text-amber-900">
                {showNzd ? 'New Zealand Dollars (NZD)' : 'Honey Drops'}
            </p>
            <p className="text-xs text-amber-800 opacity-80 mt-2">(Tap to switch)</p>
        </Card>

        {/* How It Works Card */}
        <Card className="flex-grow !p-3 flex flex-col justify-center">
            <h3 className="font-bold text-base text-gray-800 mb-2 text-center">How It Works</h3>
            <div className="space-y-2 text-sm text-gray-600 text-center">
                <p>Earn Honey Drops for every activity you complete. The more consistent you are, the more you collect!</p>
                <div className="text-center p-3 my-2 bg-amber-50 rounded-lg border-2 border-dashed border-amber-300">
                    <p className="text-base font-bold text-amber-800">990 Honey Drops = $10 NZD</p>
                    <p className="text-xs text-amber-700">Redeemable for real money!</p>
                </div>
                <p className="text-xs px-2">It is our way of saying 'thank you' for your dedication. By investing time in your child's development.</p>
            </div>
        </Card>

        {/* Redeem Button */}
        <div className="flex-shrink-0">
            <button 
                onClick={onRedeem}
                className="w-full py-3 px-4 flex items-center justify-center space-x-2 rounded-lg bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                disabled={honeyDrops < 990}
            >
                <i className="fas fa-gift"></i>
                <span>Redeem Now</span>
            </button>
            {honeyDrops < 990 && <p className="text-center text-xs text-gray-500 mt-1">You need at least 990 Honey Drops to redeem.</p>}
        </div>
    </div>
  );
};

export default HoneyStorePage;