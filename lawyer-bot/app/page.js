'use client'

import React from "react";
import Header from "@/components/Header"
import { Input, Button, Textarea } from "@material-tailwind/react";

export default function Home() {

  const [question, setQuestion] = React.useState("");
  const onChange = ({ target }) => setQuestion(target.value);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full flex items-center justify-center">
        <div className="relative flex w-full max-w-[50%]">
            <Textarea
              className="w-full h-2 py-4 pr-20 border border-gray-300 rounded-2xl overflow-y-auto"
              color="teal"
              type="text"
              label="Enter a question"
              value={question}
              onChange={onChange}
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
