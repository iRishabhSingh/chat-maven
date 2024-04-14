import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  _id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
}

const getChat = async ({ chatId }: { chatId: string }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${chatId}`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Unable to fetch Chat. Try Again!");

    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const ChatPage = async ({
  params: { chatId },
}: {
  params: { chatId: string };
}) => {
  const chats = await getChat({ chatId });
  const chat = chats.chat[0];
  const messages: [] = chat.messages;

  return (
    <>
      {chats &&
        messages.map((message: Message) => {
          return message.sender === "user" ? (
            <div key={message._id} className="py-4 flex items-center">
              <Avatar className="w-8 h-8 mr-4">
                <AvatarImage src="https://github.com/shadcn.pngg" />
                <AvatarFallback className="text-xs font-bold">
                  You
                </AvatarFallback>
              </Avatar>
              {message.content}
            </div>
          ) : (
            <div key={message._id} className="py-4 flex items-center">
              <Avatar className="w-8 h-8 mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xs font-bold">
                  Bot
                </AvatarFallback>
              </Avatar>
              {message.content}
            </div>
          );
        })}
    </>
  );
};

export default ChatPage;
