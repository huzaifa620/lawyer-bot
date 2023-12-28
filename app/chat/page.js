'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import Header from "@/components/Header";
import Typewriter from "@/components/Typewriter";
import { Button } from "@material-tailwind/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import axios from "axios";
import Select from 'react-select'
import { useSearchParams } from 'next/navigation'

const ChatPage = () => {

    const searchParams = useSearchParams()
    const category = searchParams.get('category')

    const [qas, setQas] = useState([]);
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
      { value: 'real-estate', label: 'Real Estate' }
    ]
  
    const onChangeSelect = (selectedOption) => {
      setNameSpace(selectedOption.value);
    }

    const getAnswer = async () => {
        setLoading(true)
        const body = {
          query: question,
          // pineconeIndexName: "index-rehani-soko-1-index",
          namespace: (category === 'general_legal') ? nameSpace :  "rehani-soko-privacy-and-user-agreements"
        };

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/query`, body);
    
          if (response.status === 200) {
            const data = response.data;
            const newQas = [
              ...qas,
              {
                question: question,
                answer: data.answer
              }
            ];
            setQas(newQas);
            setQuestion("");
            setRows(1);
            setLoading(false)
          } else {
            console.error("Error:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
    }; 

    React.useEffect(() => {
      const divElement = document.querySelector('div.overflow-y-auto');
      divElement?.scrollTo(0, divElement.scrollHeight);
    }, [qas]);

    return (
        <div className="flex flex-col items-center justify-end min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" >
          <div className="w-full h-full">
            <Image
              src="/images/bg.png"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
            />
            <Header />
            <div className="flex relative flex-col space-y-6 items-center justify-between lg:px-0 bg-center w-full min-h-[93vh] py-8">

              <div className='flex flex-col items-center justify-center w-full space-y-4'>
                <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSe0jFhhEGZDdroVHXxac8gHoj7OZg-_tU6VBsM8BCRPpHul5zi' className='w-24 h-24 rounded-full' alt='' />
                <div className='bg-white w-1/2 h-1 ' />
              </div>

              {qas.length ? (
                <div className='flex flex-col items-center justify-center max-h-[67vh] w-full lg:w-1/2 bg-brown-200/80 rounded-2xl p-2'>
                  <div className="overflow-y-auto scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-[65vh] w-full">
                    {qas?.map((item, index) => (
                      <div className='flex flex-col space-y-4 p-4 w-full' key={index}>
                        <div className='flex justify-end'>
                          <p className='bg-white p-4 text-justify max-w-[60%] rounded-3xl overflow-x-hidden'>
                            {item.question}
                          </p>
                        </div>
                        <div className='flex items-center space-x-4 justify-start'>
                          <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSe0jFhhEGZDdroVHXxac8gHoj7OZg-_tU6VBsM8BCRPpHul5zi' className='w-12 h-12 rounded-full' />
                          <p className='bg-white p-4 text-justify max-w-[60%] rounded-3xl'>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <h1 className="bg-white flex items-center justify-center p-4 rounded-3xl font-bold text-lg lg:text-xl text-black/80 bg-opacity-60 backdrop-blur hover:bg-opacity-80 hover:text-black backdrop-saturate-100 tracking-widest cursor-pointer">
                  <Typewriter text="Hi there, what can I help you with today?" />
                </h1>
              ) }

              <div className='flex items-center justify-center w-full'>
                  <div className="flex space-x-4 items-center justify-center w-full lg:max-w-[50%] h-auto py-3 px-4 rounded-2xl bg-white/60">

                    <textarea
                      className="w-full z-40 outline-none scroll-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent font-semibold py-3 text-justify px-2 bg-transparent placeholder-gray-600"
                      placeholder={!nameSpace ? "Please select a topic on the right..." : "Ask a question..."}
                      type="text"
                      rows={rows}
                      value={question}
                      onChange={({ target }) => setQuestion(target.value)}
                      disabled={!nameSpace}
                      onInput={(e) => {
                        e.target.rows = question?.length ? 1 : 1;
                        const rowsValue = Math.min( Math.ceil(e.target.scrollHeight / 80), 3 );
                        e.target.rows = rowsValue;
                        setRows(rowsValue);
                      }}
                    />

                    { (category === 'general_legal') &&
                      <div className="z-20 flex w-40 flex-col items-center justify-center gap-6">
                        <Select
                          className="w-full text-xs focus:outline-none border-none"
                          styles={customStyles}
                          options={options}
                          placeholder={"Topic"}
                          value={options.find((option) => option.value === nameSpace)}
                          onChange={onChangeSelect}
                          menuPlacement="top"
                        />
                      </div>
                    }

                    <Button
                      size="sm"
                      color={question ? "teal" : "blue-gray"}
                      disabled={!question}
                      className="rounded-lg h-[44px] w-[50px]"
                      onClick={getAnswer}
                      >
                      {loading ? <LoadingIndicator /> : 
                          <span className="flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                          </svg>
                          </span>}
                    </Button>

                  </div>
              </div>

            </div>
          </div>
        </div>
    );
}

export default ChatPage