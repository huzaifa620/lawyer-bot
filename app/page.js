'use client';

import React from "react";
import Header from "@/components/Header";
import Typewriter from "@/components/Typewriter";
import Image from 'next/image';
import { useRouter } from "next/navigation";
 

export default function Home() {

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" >
      <div className="w-full h-full">
        <Image
          src="/images/bg.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
        <Header />
        <div className="flex flex-col space-y-12 items-center justify-center lg:px-0 bg-center min-h-[93%] h-[100%] w-full">

          <div className="relative flex w-1/2 items-center justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <p key={index} className={`bg-black rounded-full w-6 h-6`}></p>
            ))}
          </div>

          <h1 className="relative text-2xl lg:text-xl 2xl:text-4xl font-bold text-center px-2 w-full md:w-3/4 2xl:w-1/2 text-black/80 items-center justify-center pb-12">
            <Typewriter text="Hi there, what can I help you with today?" />
          </h1>

          <div className="z-20 flex md:w-1/2 xl:w-1/4 flex-col items-center justify-center gap-6">

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer" onClick={() => router.push('/chat?category=general_legal')}>
              General Legal Questions
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              Contract Drafting & Review
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              Case & Precedent Analysis
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer" onClick={() => router.push('/chat?category=general_help')}>
              General Help
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
