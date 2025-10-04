'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  rotationDuration?: number;
  imageUrl?: string;
}

function Globe({
  size = 280,
  rotationDuration = 30,
  className,
  style,
  imageUrl,
  ...props
}: GlobeProps) {
  const textureUrl =
    imageUrl ??
    'https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg';

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={style}
      {...props}
    >
      <style>
        {`
            @keyframes globe-earth-rotate {
              0% { background-position: 0 0; }
              100% { background-position: 400px 0; }
            }
          `}
      </style>
      <div
        className="relative overflow-hidden rounded-full shadow-[0_0_24px_rgba(255,255,255,0.35),-5px_0_12px_#c3f4ff_inset,18px_2px_28px_#000_inset,-24px_-2px_36px_#c3f4ff99_inset,150px_0_38px_#000000aa_inset]"
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${textureUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          animation: `globe-earth-rotate ${rotationDuration}s linear infinite`,
        }}
      />
    </div>
  );
}

export { Globe };
