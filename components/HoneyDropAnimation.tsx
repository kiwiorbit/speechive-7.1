import React, { useEffect } from 'react';

interface HoneyDropAnimationProps {
  onAnimationEnd: () => void;
}

const HoneyDropAnimation: React.FC<HoneyDropAnimationProps> = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 1200); // Should be slightly longer than animation duration
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  const createDrops = () => {
    const drops = [];
    const numDrops = 15;
    // Target is the top right corner of the screen
    const endX = window.innerWidth / 2 - 40; 
    const endY = -window.innerHeight / 2 + 40;

    for (let i = 0; i < numDrops; i++) {
      const startX = (Math.random() - 0.5) * 100;
      const startY = (Math.random() - 0.5) * 100;
      const delay = Math.random() * 0.2;

      const style: React.CSSProperties = {
        top: '50%',
        left: '50%',
        animationDelay: `${delay}s`,
        ['--start-x' as any]: `${startX}px`,
        ['--start-y' as any]: `${startY}px`,
        ['--end-x' as any]: `${endX}px`,
        ['--end-y' as any]: `${endY}px`,
      };
      drops.push(<div key={i} className="honey-drop" style={style}></div>);
    }
    return drops;
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {createDrops()}
    </div>
  );
};

export default HoneyDropAnimation;