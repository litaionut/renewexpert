
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'footer';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'md' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const textColor = variant === 'footer' 
    ? 'text-white' 
    : 'text-gray-900';

  return (
    <Link to="/" className={`inline-block ${textColor}`}>
      <h1 className={`font-serif ${sizes[size]} tracking-widest`}>RenewExpert</h1>
    </Link>
  );
};

export default Logo;
