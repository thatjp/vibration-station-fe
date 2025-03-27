'use client'

import React from 'react'
import { VideoProvider } from './_components/VideoContext'
import VideoPlayer from './_components/VideoPlayer'

function Page() {
  return (
    <VideoProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <VideoPlayer />
      </div>
    </VideoProvider>
  )
}

export default Page