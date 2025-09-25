
import React from 'react';
import BeeLogo from './BeeLogo';

const Loader: React.FC = () => {
  return (
    <div className="honeycomb-background flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div style={{ animation: 'buzz-around 2.5s ease-in-out forwards', zIndex: 10 }}>
        <BeeLogo className="w-24 h-24" />
      </div>
      <p 
        className="mt-6 text-xl font-semibold text-amber-500 tracking-wider opacity-0"
        style={{ animation: 'fadeIn 1s ease-out 2.5s forwards', zIndex: 10 }}
      >
        Warming up the hive...
      </p>
    </div>
  );
};

export default Loader;