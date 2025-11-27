'use client';
import { useEffect, useState } from 'react';

export default function Parallax3D({
  children,
  speed = 0.5,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        transform: `translateY(${offset * speed}px) translateZ(${
          offset * 0.1
        }px)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="transform-gpu"
    >
      {children}
    </div>
  );
}
