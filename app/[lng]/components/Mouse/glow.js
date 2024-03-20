'use client'

import { useState } from 'react';

export default function MouseGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  return (
    <div
    className='relative z-10 h-full w-full'
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      >
      <div
      className='absolute top-10- left-10- bg-teal-500' 
      style={{
        // position: 'absolute',
        // backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        // left: -10,
        // top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
