"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    if (message.trim() !== "") {
      setMessage("");
    }
  };

  const isMessageEmpty = message.trim() === "";

  return (
    <div className="relative flex w-full md:w-[80%] items-center space-x-2">
      <Input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Message ChatVirtuoso..."
        className="h-12 w-full pr-16"
      />
      <Button
        type="button"
        onClick={handleClick}
        disabled={isMessageEmpty}
        className="absolute right-2 p-0 w-8 h-8 bg-white disabled:bg-transparent text-[#000000D0] disabled:text-[#fff]"
      >
        <ArrowUp width={20} height={20} strokeWidth={3} />
      </Button>
    </div>
  );
};

export default ChatInput;
