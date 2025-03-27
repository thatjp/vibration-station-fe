'use client';

import React, { createContext, useContext, useState } from 'react';

interface VideoContextType {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/watch?v=tHF7R2x_yuA');

  return (
    <VideoContext.Provider value={{ videoUrl, setVideoUrl }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
} 