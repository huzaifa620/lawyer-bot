'use client';

import React from 'react'
import Header from '@/components/Header'

const page = () => {
  return (
    <div className="flex flex-col min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" style={{ backgroundImage: 'url("https://media.istockphoto.com/id/657510172/vector/geometric-pattern-seamless-vector-background.jpg?s=612x612&w=0&k=20&c=IadUgpO6t724bMp6hVlxsy-qoAjIaWqp4qcrsJuHb8I=")'}}>

        <Header />

        <div className='flex items-center justify-center text-red-900 font-bold text-9xl'>
          COMING SOON
        </div>
    </div>
  )
}

export default page