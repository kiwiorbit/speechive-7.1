import React, { useState, useEffect, useRef } from 'react';

interface FloatingTimerProps {
  startTime: number;
  onStop: () => void;
}

// Helper to format seconds into MM:SS
const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// FIX: Added FloatingTimerProps type to the component definition
const FloatingTimer: React.FC<FloatingTimerProps> = ({ startTime, onStop }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const MINIMUM_SECONDS = 0; // 10 minutes
  const canStop = elapsedSeconds >= MINIMUM_SECONDS;
  const timeRemaining = MINIMUM_SECONDS - elapsedSeconds;

  useEffect(() => {
    const updateTimer = () => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsedSeconds(seconds);
    };

    updateTimer(); // Initial update

    intervalRef.current = window.setInterval(updateTimer, 1000);

    // Add event listener to catch up when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startTime]);

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end space-y-2 animate-fadeIn" style={{ right: '1rem', bottom: '6rem' }}>
      <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg">
        <div 
          className="bg-orange-600 text-white font-mono text-lg font-semibold py-2 px-4 rounded-full"
          style={{ animation: canStop ? 'pulse 2s infinite' : 'none' }}
        >
          {formatTime(elapsedSeconds)}
        </div>
        <button
          onClick={onStop}
          disabled={!canStop}
          className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center transition-colors hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          aria-label="Stop timer"
        >
          <i className="fas fa-stop"></i>
        </button>
      </div>
      {!canStop && (
        <div className="bg-white/90 backdrop-blur-sm text-xs text-gray-700 font-semibold px-3 py-1 rounded-full shadow-md">
          Stop in {formatTime(timeRemaining)}
        </div>
      )}
    </div>
  );
};

export default FloatingTimer;