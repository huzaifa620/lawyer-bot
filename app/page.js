'use client';

import React, { useState } from "react";
import Header from "@/components/Header"
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import ChatHistory from "@/components/ChatHistory";
import LoadingIndicator from "@/components/LoadingIndicator";
import axios from "axios";

export default function Home() {
  const [qas, setQas] = useState([]);
  const [rows, setRows] = useState(1);
  const [question, setQuestion] = useState("");
  const [nameSpace, setNameSpace] = useState("");
  const [loading, setLoading] = useState(false)

  const onChange = ({ target }) => setQuestion(target.value);

  const getAnswer = async () => {
    setLoading(true)
    const body = {
      query: question,
      pineconeIndexName: "index-rehani-soko-1-index",
      namespace: nameSpace
    };

    try {
      const response = await axios.post("https://rehani-soko.owaisahmed8.repl.co/chatbot/send", body);

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

  return (
    <div className="flex flex-col min-h-screen space-y-12 w-full scrollbar-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent" style={{ backgroundImage: 'url("https://media.istockphoto.com/id/657510172/vector/geometric-pattern-seamless-vector-background.jpg?s=612x612&w=0&k=20&c=IadUgpO6t724bMp6hVlxsy-qoAjIaWqp4qcrsJuHb8I=")'}}>
      <Header />
      <div className="flex flex-col space-y-12 items-center justify-center px-4 bg-center min-h-[93%] h-[100%] w-full">
        {qas.length !== 0 ? (
          <ChatHistory history={qas} />
        ) : (
          <h1 className="text-3xl font-semibold text-center">Hi there, what can I help you with today?</h1>
        )}

        <div className="sticky bottom-12 z-10 flex flex-col w-full px-4 lg:px-0 lg:max-w-[50%] shadow-2xl items-center justify-center space-y-12">

          <div className="z-20 flex w-72 flex-col items-center justify-center gap-6 shadow-2xl">
            <Select
              className="bg-white"
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
          
          <textarea
            className="w-full p-2 pr-20 border border-gray-300 rounded outline-none focus:ring-1 ring-teal-500 shadow-2xl scroll-container scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            placeholder="Ask a question"
            type="text"
            rows={rows}
            value={question}
            onChange={onChange}
            onInput={(e) => {
              e.target.rows = question?.length ? 1 : 1;
              const rowsValue = Math.min(Math.ceil(e.target.scrollHeight / 40), 10);
              e.target.rows = rowsValue;
              setRows(rowsValue);
            }}
            disabled={!nameSpace}
          />
          <Button
            size="sm"
            color={question ? "teal" : "blue-gray"}
            disabled={!question}
            className="!absolute right-6 lg:right-1 bottom-1 rounded w-[62px] h-[32px]"
            onClick={getAnswer}
          >
            {loading ? <LoadingIndicator /> : <span className="tracking-widest">SEND</span>} 
          </Button>
        </div>
      </div>
    </div>
  );
}
