'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CartesianGridProps {
  onCoordinateChange?: (x: number, y: number) => void;
}

const CartesianGrid: React.FC<CartesianGridProps> = ({ onCoordinateChange }) => {
  const [position, setPosition] = useState({ x: 250, y: 250 }); // Start at center
  const [isDragging, setIsDragging] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updatePosition = (e: React.MouseEvent) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(500, e.clientX - rect.left));
    const y = Math.max(0, Math.min(500, e.clientY - rect.top));

    setPosition({ x, y });
    onCoordinateChange?.(x, y);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={gridRef}
      className="relative border border-gray-300 bg-white"
      style={{ width: '500px', height: '500px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >

      {/* Draggable dot */}
      <div
        className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      />

      {/* Coordinate display */}
      <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-sm">
        X: {Math.round(position.x)}, Y: {Math.round(position.y)}
      </div>
    </div>
  );
};

export default CartesianGrid; 