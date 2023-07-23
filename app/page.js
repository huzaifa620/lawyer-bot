'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Typewriter from "@/components/Typewriter";
import axios from "axios";

export default function Home() {

  const [qas, setQas] = useState(null);
  const [rows, setRows] = useState(1);
  const [question, setQuestion] = useState("");
  const [nameSpace, setNameSpace] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-[#bc60a0]">
      <Header />
      <div className="flex flex-col space-y-12 items-center justify-center lg:px-0 bg-center min-h-[93%] h-[100%] w-full">

      <div className="flex w-1/2 text-white text-5xl items-center justify-center space-x-4">
        {[0, 1, 2, 3].map((index) => (
         <p
         key={index}
         className={`bg-white rounded-full w-3 h-3 ${
           index === visibleDots ? "h-9" : ""
         }`}
       ></p>
        ))}
      </div>

        <h1 className={`text-3xl font-semibold text-center w-1/2 text-white items-center justify-center ${qas?.answer?.length > 50 && "text-justify"}`} key={qas?.answer}>
          {qas ? (
            <Typewriter text={qas.answer} />
          ) : (
            <Typewriter text="Hi there, what can I help you with today?" />
          )}
        </h1>

        <div className="sticky bottom-0 z-10 flex flex-col w-full px-4 lg:px-0 items-center space-y-12 relative pt-5 py-11">
          <div className="z-20 flex w-72 flex-col items-center justify-center gap-6 shadow-2xl">
            <Select
              className="bg-white border-none outline-none transition-none"
              color="teal"
              label="Select Namespace"
              value={nameSpace}
              onChange={(value) => setNameSpace(value)}
            >
              <Option value="banking">Banking</Option>
              <Option value="rehani-soko-privacy-and-user-agreements">
                Privacy and User agreements
              </Option>
              <Option value="real-estate">Real Estate</Option>
            </Select>
          </div>

          <div className="flex space-x-4 items-center justify-center w-full lg:max-w-[50%] h-auto py-3 px-4 rounded-2xl bg-white">
            <textarea
              className="w-full outline-none scroll-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent font-semibold py-3 text-justify px-2"
              placeholder="Send a message"
              type="text"
              rows={rows}
              value={question}
              onChange={onChange}
              onInput={(e) => {
                e.target.rows = question?.length ? 1 : 1;
                const rowsValue = Math.min(
                  Math.ceil(e.target.scrollHeight / 80),
                  10
                );
                e.target.rows = rowsValue;
                setRows(rowsValue);
              }}
              disabled={!nameSpace}
            />

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
  );
}
