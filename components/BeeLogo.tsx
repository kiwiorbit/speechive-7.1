import React from 'react';

interface BeeLogoProps {
  className?: string;
}

const BeeLogo: React.FC<BeeLogoProps> = ({ className }) => {
  return (
    <img
      src="/images/speechive-logo.png"
      alt="Speechive Bee Logo"
      className={className}
      role="img"
    />
  );
};

export default BeeLogo;