import React, { useState, useEffect, useRef } from 'react';
import { Page, StrategyChallenge, Activity, NaturalisticStrategyType } from '../types';
import Modal from './Modal';

interface StrategyChallengePageProps {
  challenge: StrategyChallenge;
  setActivePage: (page: Page) => void;
  onStartTimer: (strategyType: NaturalisticStrategyType, dayIndex: number, activityId: string) => void;
  isTimerActive: boolean;
  activitiesCompletedToday: number;
}

const formatDuration = (seconds: number) => {
    if (seconds === 0) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `(${minutes}m ${remainingSeconds}s)`;
};

const ActivityItem: React.FC<{
  activity: Activity;
  onSelect: (activity: Activity) => void;
  color: string;
  isDisabled: boolean;
}> = ({ activity, onSelect, color, isDisabled }) => (
  <button 
    onClick={() => onSelect(activity)} 
    disabled={isDisabled}
    className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center space-x-4 bg-white border-l-4 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${activity.completed ? 'opacity-70' : ''} disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:shadow-none`}
    style={{ borderColor: color, ['--tw-ring-color' as any]: color }}
    >
    <img src={activity.image} alt={activity.title} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
    <div className="flex-grow">
      <h4 className={`font-bold text-gray-800 md:text-xl ${activity.completed ? 'line-through' : ''}`}>{activity.title}</h4>
      <p className="text-sm md:text-base text-gray-600 mb-2">{activity.description}</p>
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500">
        <div className="flex items-center gap-1 font-medium">
          <i className="fas fa-clock"></i>
          <span>~{activity.recommendedTime} min</span>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {activity.skills.map(skill => (
            <span key={skill} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">{skill}</span>
          ))}
        </div>
      </div>
    </div>
     <div className="flex flex-col items-center justify-center space-y-1 text-center">
        {activity.completed ? (
            <>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <i className="fas fa-check text-white"></i>
                </div>
                <span className="text-xs font-semibold text-green-600">{formatDuration(activity.duration)}</span>
            </>
        ) : (
            <i className="fas fa-chevron-right text-gray-400"></i>
        )}
     </div>
  </button>
);

/**
 * Finds the index of the first day in the 30-day challenge that is not yet completed.
 * A day is considered incomplete if it has activities that are not marked as completed,
 * or if the day itself has not been defined in the challenge data yet.
 * @param challenge The strategy challenge data.
 * @returns The 0-based index of the next day to work on.
 */
const findNextIncompleteDayIndex = (challenge: StrategyChallenge): number => {
    const dayCompletionStatus = new Map<number, boolean>();

    // Determine the completion status for each day that has defined activities.
    challenge.challenge.forEach(dayData => {
        if (dayData.activities.length > 0) {
            const allComplete = dayData.activities.every(a => a.completed);
            dayCompletionStatus.set(dayData.day, allComplete);
        } else {
            // A day defined with no activities is considered complete for progression.
            dayCompletionStatus.set(dayData.day, true);
        }
    });

    // Find the first day (from 1 to 30) that is not fully completed.
    for (let day = 1; day <= 30; day++) {
        const isComplete = dayCompletionStatus.get(day);
        // The next day is one that is not yet defined (undefined) or is defined but has incomplete activities (false).
        if (isComplete === undefined || isComplete === false) {
            return day - 1; // Return 0-based index
        }
    }
    
    // If all 30 days are complete, default to the last day.
    return 29;
};

const StrategyChallengePage: React.FC<StrategyChallengePageProps> = ({ challenge, setActivePage, onStartTimer, isTimerActive, activitiesCompletedToday }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(() => findNextIncompleteDayIndex(challenge));
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const daySelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (daySelectorRef.current) {
        const activeButton = daySelectorRef.current.querySelector<HTMLButtonElement>(`[data-day-index="${currentDayIndex}"]`);
        if (activeButton) {
            activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
  }, [currentDayIndex]);

  const isDailyLimitReached = activitiesCompletedToday >= 3;
  const currentDayData = challenge.challenge.find(d => d.day === currentDayIndex + 1);
  const totalDays = 30; // Hardcoded for 30-day challenge structure

  const handleCloseModal = () => setSelectedActivity(null);
  
  const handleStartActivity = () => {
    if (selectedActivity) {
      onStartTimer(challenge.type, currentDayIndex, selectedActivity.id);
      handleCloseModal();
    }
  };
  
  const hexColorName = challenge.color.replace('bg-', '').split('-')[0];
  const themeColorValue = {
      sky: '#38bdf8',
      rose: '#fb7185',
      indigo: '#818cf8',
      green: '#4ade80'
  }[hexColorName] || '#fbbf24';

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-4">
        <button onClick={() => setActivePage(Page.Strategies)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back to strategies">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <div>
          <h2 className="text-2xl md:text-5xl font-bold text-gray-800">{challenge.title} Challenge</h2>
          <p className="text-gray-500 md:text-xl">{challenge.description}</p>
        </div>
      </div>

      {isDailyLimitReached && (
        <div className="p-3 bg-sky-100 text-sky-800 rounded-lg text-center font-semibold animate-fadeIn">
            <i className="fas fa-check-circle mr-2"></i>
            You've completed your 3 activities for today. Great job!
        </div>
      )}

      <div ref={daySelectorRef} className="py-2 overflow-x-auto day-selector-scrollbar">
        <div className="flex items-center space-x-3 px-2 pb-3">
          {Array.from({ length: totalDays }, (_, i) => i).map((index) => {
            const day = index + 1;
            const isActive = index === currentDayIndex;
            return (
              <button 
                key={day} 
                data-day-index={index} 
                onClick={() => setCurrentDayIndex(index)}
                className={`hexagon flex-shrink-0 w-16 h-14 md:w-20 md:h-[4.5rem] flex items-center justify-center font-bold text-sm md:text-xl shadow-sm transition-all duration-300 ease-in-out focus:outline-none ${
                  isActive ? `${challenge.color} text-white` : 'bg-white text-gray-500 hover:bg-amber-100'
                }`}
                style={isActive ? { filter: `drop-shadow(0 0 6px ${themeColorValue})` } : {}}
                aria-label={`Go to Day ${day}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative pt-4">
        <h3 className="text-center font-bold text-lg md:text-3xl text-gray-600 mb-4">Day {currentDayIndex + 1} Activities</h3>
        {currentDayData && currentDayData.activities.length > 0 ? (
          <div className="space-y-3 md:grid md:grid-cols-1 md:gap-4 md:space-y-0">
            {currentDayData.activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} onSelect={setSelectedActivity} color={challenge.color.replace('bg-','border-').replace('500','400')} isDisabled={isDailyLimitReached && !activity.completed} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
            <i className="fas fa-cogs text-4xl text-gray-400 mb-3"></i>
            <h4 className="font-bold text-lg text-gray-700">Coming Soon!</h4>
            <p className="text-gray-500">Activities for this day are being prepared.</p>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedActivity} onClose={handleCloseModal}>
        {selectedActivity && (
          <div className="flex flex-col max-h-[80vh]">
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              <img src={selectedActivity.image} alt={selectedActivity.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">{selectedActivity.title}</h3>
              <p className="text-gray-600 mt-2 mb-4">{selectedActivity.description}</p>
              
              <div className="space-y-4">
                {selectedActivity.script.map((scriptItem, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-lg text-amber-700 mb-3">{scriptItem.title}</h4>
                    <div className="space-y-3">
                      {scriptItem.dialogue.map((line, lineIndex) => (
                        <div key={lineIndex} className={`flex items-start gap-3 ${line.speaker === 'Parent' ? 'flex-row-reverse' : ''}`}>
                          {line.speaker === 'Child' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center"><i className="fas fa-child text-sky-600"></i></div>}
                          <div className={`p-2 rounded-lg max-w-xs md:max-w-sm ${line.speaker === 'Parent' ? 'bg-amber-100 text-amber-900' : 'bg-sky-100 text-sky-900'}`}>
                            <p className="text-sm">{line.line}</p>
                          </div>
                          {line.speaker === 'Parent' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"><i className="fas fa-user-friends text-amber-600"></i></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200">
                {selectedActivity.completed ? (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-semibold text-green-800">
                            <i className="fas fa-check-circle mr-2"></i>
                            Activity Complete!
                        </p>
                        <p className="text-sm text-green-700">Total time spent: {formatDuration(selectedActivity.duration).replace(/[()]/g, '')}</p>
                    </div>
                ) : (
                    <button
                        onClick={handleStartActivity}
                        disabled={isTimerActive || isDailyLimitReached}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <i className={`fas ${isDailyLimitReached ? 'fa-stop-circle' : 'fa-play-circle'} mr-2`}></i>
                        {isTimerActive ? 'Another activity is in progress' : isDailyLimitReached ? 'Daily limit reached' : 'Start Now'}
                    </button>
                )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StrategyChallengePage;