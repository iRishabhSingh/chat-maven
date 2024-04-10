"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="relative flex w-full md:w-[80%] items-center space-x-2">
      <Input
        type="text"
        placeholder="Message ChatVirtuoso..."
        className="h-12 w-full pr-16"
      />
      <Button type="submit" variant="link" className="absolute right-0 h-12">
        <SendHorizontal width={20} height={20} />
      </Button>
    </div>
  );
};

export default ChatInput;
