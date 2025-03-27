'use client';

import React, { useState } from 'react';
import { useVideo } from './VideoContext';
import Modal from './Modal';
import CartesianGrid from './CartesianGrid';

const VideoPlayer: React.FC = () => {
  const { videoUrl } = useVideo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCoordinateChange = (x: number, y: number) => {
    console.log(`Coordinates: (${x}, ${y})`);
  };

  const getEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        // Extract video ID from YouTube URL
        let videoId = '';
        if (urlObj.hostname.includes('youtube.com')) {
          videoId = urlObj.searchParams.get('v') || '';
        } else {
          videoId = urlObj.pathname.slice(1);
        }
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
      }
      return url; // Return original URL if not YouTube
    } catch (error) {
      console.error('Invalid URL:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-lg">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      />
      
      {/* UI Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-20 right-4 pointer-events-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-900 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Video Settings"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              type="text"
              value={videoUrl}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Coordinate Grid</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <CartesianGrid onCoordinateChange={handleCoordinateChange} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPlayer; 