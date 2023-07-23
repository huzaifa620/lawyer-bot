'use client';

import React from 'react'
import Header from '@/components/Header'

const HistoryPage = () => {

  const [fileUrl, setFileUrl] = React.useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      console.log(fileUrl)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-[#bc60a0]">

        <Header />

        <div className='flex items-center justify-center text-white font-bold text-9xl'>
          WORK IN PROGRESS
        </div>

    </div>
  )
}

export default HistoryPage