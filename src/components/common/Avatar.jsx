import React, { useState } from 'react';

export default function Avatar({ src, name = 'Dhruv Sonagara', size = 'md', className = '' }) {
  const [imageError, setImageError] = useState(false);

  // Extract initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'DS';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-bold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-24 h-24 text-2xl font-bold',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImageError(true)}
        className={`${selectedSize} rounded-full object-cover border border-brand-200 dark:border-brand-700/60 shadow-xs shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${selectedSize} rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0 select-none border border-brand-200 dark:border-brand-700/60 ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
}
