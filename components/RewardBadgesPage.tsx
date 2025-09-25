import React, { useState } from 'react';
import { StrategyChallenge, Badge } from '../types';
import { BADGES } from '../constants';
import Card from './Card';

interface RewardBadgesPageProps {
  strategyChallengesData: StrategyChallenge[];
  claimedBadges: number[];
  onClaimBadge: (day: number) => void;
}

// A simple confetti component for celebration
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


const BadgeItem: React.FC<{
  badge: Badge;
  isCompletable: boolean;
  isClaimed: boolean;
  onClaim: () => void;
}> = ({ badge, isCompletable, isClaimed, onClaim }) => {
  let stateClasses = 'bg-gray-100 text-gray-400';
  let statusText = 'Locked';
  let canClaim = false;

  if (isClaimed) {
    stateClasses = 'bg-amber-400 text-white shadow-lg transform scale-105';
    statusText = 'Claimed!';
  } else if (isCompletable) {
    stateClasses = 'bg-green-400 text-white cursor-pointer hover:bg-green-500';
    statusText = 'Claim Badge';
    canClaim = true;
  }

  return (
    <div className={`
      flex flex-col items-center justify-center p-4 rounded-xl text-center
      transition-all duration-300 ease-in-out ${stateClasses}
    `}
     onClick={canClaim ? onClaim : undefined}
    >
      <div className="relative">
        <i className={`${badge.icon} text-4xl`}></i>
        {/* The checkmark is now removed from the final state as requested */}
      </div>
      <h4 className="font-bold mt-2">{badge.title}</h4>
      <p className="text-xs opacity-80">{statusText}</p>
    </div>
  );
};

const RewardBadgesPage: React.FC<RewardBadgesPageProps> = ({ strategyChallengesData, claimedBadges, onClaimBadge }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClaimWithAnimation = (day: number) => {
    onClaimBadge(day);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Let confetti fall for 5 seconds
  };

  return (
    <div className="relative space-y-6 animate-fadeIn">
      {showConfetti && <ConfettiCelebration />}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Reward Badges</h2>
        <p className="text-gray-500">Complete daily challenges to unlock badges!</p>
      </div>

      <Card>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const dayNumber = badge.day;
            // A badge is completable if all activities for that day are completed in AT LEAST ONE strategy.
            const isCompletable = strategyChallengesData.some(challenge => {
                const dayData = challenge.challenge.find(d => d.day === dayNumber);
                return dayData && dayData.activities.length > 0 && dayData.activities.every(a => a.completed);
            });
            const isClaimed = claimedBadges.includes(badge.day);

            return (
              <BadgeItem
                key={badge.day}
                badge={badge}
                isCompletable={isCompletable}
                isClaimed={isClaimed}
                onClaim={() => handleClaimWithAnimation(badge.day)}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default RewardBadgesPage;