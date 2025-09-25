import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disableHoverScale?: boolean;
  id?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, style, disableHoverScale = false, id }) => {
  const hoverClasses = onClick
    ? `cursor-pointer ${!disableHoverScale ? 'hover:scale-105' : ''} hover:shadow-lg`
    : '';

  const cardClasses = `bg-white rounded-lg shadow-md p-2 md:p-4 transition-transform duration-200 ease-in-out ${hoverClasses} ${className}`;

  return (
    <div id={id} className={cardClasses} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Card;
