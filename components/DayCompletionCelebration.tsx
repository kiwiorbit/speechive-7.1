import React, { useEffect } from 'react';
import { BADGES } from '../constants';

interface DayCompletionCelebrationProps {
  day: number;
  onClose: () => void;
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="confetti-piece" style={{ ...style, zIndex: 100 }}></div>
);

const ConfettiCelebration: React.FC = () => {
    const confettiColors = ['#fbbf24', '#f59e0b', '#4f46e5', '#ec4899', '#22c55e'];
    const confettiElements = Array.from({ length: 100 }).map((_, index) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {confettiElements}
        </div>
    );
};

const DayCompletionCelebration: React.FC<DayCompletionCelebrationProps> = ({ day, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const badge = BADGES.find(b => b.day === day);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 modal-overlay" role="alert">
      <ConfettiCelebration />
      <div className="modal-content w-full max-w-sm bg-white p-6 rounded-xl shadow-2xl text-center animate-popIn">
        {badge && (
          <div className="mx-auto w-20 h-20 rounded-full bg-amber-400 text-white flex items-center justify-center mb-4 text-4xl shadow-lg">
            <i className={badge.icon}></i>
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-800">Day {day} Complete!</h2>
        <p className="text-gray-600 mt-2">
          You've unlocked the Day {day} badge. Visit the <span className="font-semibold text-amber-600">Reward Badges</span> page to claim it and earn a bonus!
        </p>
      </div>
    </div>
  );
};

export default DayCompletionCelebration;
