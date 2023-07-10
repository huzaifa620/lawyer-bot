'use client';

import React, { useState } from "react";
import Header from "@/components/Header"
import { Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import ChatHistory from "@/components/ChatHistory";
import axios from "axios";

export default function Home() {
  const [qas, setQas] = useState([]);
  const [rows, setRows] = useState(1);
  const [question, setQuestion] = useState("");
  const [nameSpace, setNameSpace] = useState("");

  const onChange = ({ target }) => setQuestion(target.value);

  const getAnswer = async () => {
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
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }; 

  return (
    <div className="flex flex-col h-auto min-h-screen space-y-12">
      <Header />
      <div className="h-full flex flex-col space-y-12 items-center justify-center">
        {qas.length !== 0 ? (
          <ChatHistory history={qas} />
        ) : (
          <h1 className="text-lg">Hi there, what can I help you with today?</h1>
        )}

        <div className="sticky bottom-32 z-20 flex w-72 flex-col gap-6">
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

        <div className="sticky bottom-12 z-10 flex w-full max-w-[50%]">
          <textarea
            className="w-full p-2 pr-20 border border-gray-300 rounded outline-none focus:ring-1 ring-teal-500"
            placeholder="Ask a question"
            type="text"
            rows={rows}
            value={question}
            onChange={onChange}
            onInput={(e) => {
              e.target.rows = question?.length ? 1 : 1;
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
  );
}
