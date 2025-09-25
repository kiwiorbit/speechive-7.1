import React, { useState, useEffect } from 'react';
import Card from './Card';
import ChecklistItem from './ChecklistItem';
import { CHECKLIST_ITEMS } from '../constants';
import { ChecklistItemData } from '../types';

interface ChecklistPageProps {
  onAllCompleted: () => void;
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="confetti-piece" style={style}></div>
);

const CelebrationView: React.FC = () => {
    const confettiColors = ['#fbbf24', '#f59e0b', '#f3f4f6', '#4f46e5', '#ec4899'];
    const confettiElements = Array.from({ length: 50 }).map((_, index) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return (
        <div className="relative flex flex-col items-center justify-center text-center p-8 rounded-lg overflow-hidden">
            {confettiElements}
            <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <i className="fas fa-trophy text-6xl text-amber-400 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800">All Done for Today!</h3>
                <p className="text-gray-600 mt-2">Amazing work! You've completed all your daily routines. Consistency is key, and you're doing wonderfully.</p>
                <p className="text-gray-600 mt-2 font-semibold">Come back tomorrow for a fresh start!</p>
            </div>
        </div>
    );
};


const ChecklistPage: React.FC<ChecklistPageProps> = ({ onAllCompleted }) => {
  const [checklist, setChecklist] = useState<ChecklistItemData[]>(
      CHECKLIST_ITEMS.map(item => ({...item, completed: false}))
  );
  const [allCompleted, setAllCompleted] = useState(false);
  const [completionAwarded, setCompletionAwarded] = useState(false);

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;

  useEffect(() => {
    if (completedCount === totalCount && totalCount > 0 && !completionAwarded) {
      setCompletionAwarded(true);
      onAllCompleted();
      const timer = setTimeout(() => setAllCompleted(true), 500);
      return () => clearTimeout(timer);
    }
  }, [completedCount, totalCount, onAllCompleted, completionAwarded]);
  
  if (allCompleted) {
    return <CelebrationView />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Daily Checklist</h2>
        <p className="text-gray-500">Track your essential daily routines.</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
             <p className="text-sm text-gray-600">
                You've completed <span className="font-bold text-amber-500">{completedCount} of {totalCount}</span> tasks!
             </p>
             <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(completedCount/totalCount)*100}%` }}></div>
             </div>
        </div>
        <div className="space-y-2">
          {checklist.map(item => (
            <ChecklistItem key={item.id} item={item} onToggle={toggleChecklistItem} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ChecklistPage;