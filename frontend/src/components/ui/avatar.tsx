// avatar.tsx
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const sizeClasses = {
  small: 'w-12 h-12',
  medium: 'w-16 h-16',
  large: 'w-24 h-24',
  xlarge: 'w-32 h-32' // Tamaño extra grande
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, initials, size = 'medium' }) => {
  return (
    <div className={`contenedor-avatar rounded-full ${sizeClasses[size]} border-4 border-background relative`}>
      {src ? (
        <img src={src} alt={alt} className="imagen-avatar rounded-full" />
      ) : (
        <div className="fallback-avatar flex items-center justify-center h-full w-full bg-gray-200 rounded-full">
          {initials || 'N/A'}
        </div>
      )}
    </div>
  );
};

export const AvatarImage: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} className="imagen-avatar rounded-full" />
);

export const AvatarFallback: React.FC<{ initials: string }> = ({ initials }) => (
  <div className="fallback-avatar flex items-center justify-center h-full w-full bg-gray-200 rounded-full">
    {initials}
  </div>
);
