'use client';

import React from "react";
import Header from "@/components/Header"
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import ChatHistory from "@/components/ChatHistory";

export default function Home() {

  const [qas, setQas] = React.useState([])
  const [rows, setRows] = React.useState(1);
  const [question, setQuestion] = React.useState(null);
  const [nameSpace, setNameSpace] = React.useState(null)
  const onChange = ({ target }) => setQuestion(target.value);
  
  const getAnswer = () => {
    const newQas = [
      ...qas,
      {
        question: question,
        answer: 'I am leaving'
      }
    ];
    setQas(newQas);
    setQuestion("");
    setRows(1)
  };
  

  return (
    <div className="flex flex-col h-auto min-h-screen space-y-12">
      <Header />
      <div className="h-full flex flex-col space-y-12 items-center justify-center">

        {qas.length !== 0 ? <ChatHistory history={qas} /> :
          <h1 className="text-lg">Hi there, what can I help you with today?</h1> 
        }

        <div className="sticky bottom-32 flex w-72 flex-col gap-6">
          <Select className="bg-white" color="teal" label="Select Namespace" onChange={(value) => setNameSpace(value)}>
            <Option value="banking">Banking</Option>
            <Option value="rehani-soko-privacy-and-user-agreements">Privacy and User agreements</Option>
            <Option value="real-estate">Real Estate</Option>
          </Select>
        </div>

        <div className="sticky bottom-12 flex w-full max-w-[50%]">
            <textarea
              className="w-full p-2 pr-20 border border-gray-300 rounded outline-none focus:ring-1 ring-teal-500"
              placeholder="Ask a question"
              type="text"
              rows={rows}
              value={question}
              onChange={onChange}
              onInput={(e) => {
                e.target.rows = question?.length ? 1:1 ;
                const rowsValue = Math.ceil(e.target.scrollHeight / 40);
                e.target.rows = rowsValue;
                setRows(rowsValue);
              }}
              disabled={!nameSpace}
            />
            <Button
              size="sm"
              color={question ? "teal" : "blue-gray"}
              disabled={!question}
              className="!absolute right-1 bottom-1 rounded"
              onClick={getAnswer}
            >
              SEND
            </Button>
        </div>

      </div>
    </div>
  )
}
