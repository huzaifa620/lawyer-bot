'use client'

import React from "react";
import Header from "@/components/Header"
import { Input, Button, Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

export default function Home() {

  const [rows, setRows] = React.useState(1);
  const [question, setQuestion] = React.useState("");
  const onChange = ({ target }) => setQuestion(target.value);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex flex-col space-y-12 items-center justify-center">

        <h1 className="text-lg">Hi there, what can I help you with today?</h1>

        <div className="flex w-72 flex-col gap-6">
          <Select color="teal" label="Select Namespace">
            <Option>Blocking</Option>
            <Option>Privacy and User agreements</Option>
            <Option>Real Estate</Option>
          </Select>
        </div>

        <div className="relative flex w-full max-w-[50%]">
            <textarea
              className="w-full p-2 pr-20 border border-gray-300 rounded overflow-y-auto outline-none focus:ring-1 ring-teal-500"
              placeholder="Ask a question"
              type="text"
              rows={rows}
              value={question}
              onChange={onChange}
              onInput={(e) => {
                e.target.rows = question.length ? 1:1 ;
                const rowsValue = Math.ceil(e.target.scrollHeight / 40);
                e.target.rows = rowsValue;
                setRows(rowsValue);
              }}
            />
            <Button
              size="sm"
              color={question ? "teal" : "blue-gray"}
              disabled={!question}
              className="!absolute right-1 bottom-1 rounded"
            >
              SEND
            </Button>
        </div>

      </div>
    </div>
  )
}
