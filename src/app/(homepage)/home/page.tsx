'use client'

import React from 'react'
import CartesianGrid from './_components/CartesianGrid'

function Page() {
  const handleCoordinateChange = (x: number, y: number) => {
    console.log(`Coordinates: (${x}, ${y})`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CartesianGrid onCoordinateChange={handleCoordinateChange} />
    </div>
  )
}

export default Page