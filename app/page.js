'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@material-tailwind/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Typewriter from "@/components/Typewriter";
import Select from 'react-select'
import axios from "axios";
import Image from 'next/image';

export default function Home() {

  const [qas, setQas] = useState(null);
  const [rows, setRows] = useState(1);
  const [question, setQuestion] = useState("");
  const [nameSpace, setNameSpace] = useState("");
  const [loading, setLoading] = useState(false);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'transparent' : 'lightblue',
      borderRadius: '8px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'transparent',
      },
    })
  };

  const options = [
    { value: 'banking', label: 'Banking' },
    { value: 'rehani-soko-privacy-and-user-agreements', label: 'Privacy and User agreements' },
    { value: 'real-estate', label: 'Real Estate' }
  ]

  const onChangeSelect = (selectedOption) => {
    setNameSpace(selectedOption.value);
  }

  const onChange = ({ target }) => setQuestion(target.value);

  const getAnswer = async () => {
    setLoading(true);
    const body = {
      query: question,
      pineconeIndexName: "index-rehani-soko-1-index",
      namespace: nameSpace,
    };

    try {
      const response = await axios.post(
        "https://rehani-soko.owaisahmed8.repl.co/chatbot/send",
        body
      );

      if (response.status === 200) {
        const data = response.data;
        const newQas = {
          question: question,
          answer: data.answer,
        };
        setQas(newQas);
        setQuestion("");
        setRows(1);
        setLoading(false);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [visibleDots, setVisibleDots] = useState(null);
  const [animateDots, setAnimateDots] = useState(true);

  useEffect(() => {
    let animationCounter = 0;

    const interval = setInterval(() => {
      if (animateDots && loading) {
        setVisibleDots((prev) => (prev + 1) % 4);
        animationCounter++;
      } else {
        setVisibleDots(null)
        setAnimateDots(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [animateDots, loading]);

  useEffect(() => {
    setAnimateDots(true);
  }, [loading]);

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

          <div className="relative flex w-1/2 text-white text-5xl items-center justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
            <p
            key={index}
            className={`bg-white rounded-full w-3 h-3 ${
              index === visibleDots ? "h-9" : ""
            }`}
          ></p>
            ))}
          </div>

          <h1 className="relative text-2xl lg:text-xl 2xl:text-4xl font-bold text-center px-2 w-full md:w-3/4 2xl:w-1/2 text-black/80 items-center justify-center">
            <Typewriter text="Hi there, what can I help you with today?" />
          </h1>

          <div className="z-20 flex md:w-1/2 xl:w-1/4 flex-col items-center justify-center gap-6">

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              General Legal Questions
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              AI Based Search
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              Virtual Assistant Tasks
            </div>

            <div className="bg-white w-full flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
              General Help
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
