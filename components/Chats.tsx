import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  try {
    const response = await fetch(`http://localhost:3000/api/`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Unable to fetch Chat. Try Again!");

    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

const Chats = async () => {
  const data = await getUser();
  const chats: [] = data[0].chats;
  return (
    <>
      {chats &&
        chats.map((chat) => {
          const { chatId, chatName } = chat;

          return (
            <Button
              asChild
              key={chatId}
              variant="ghost"
              className="w-full p-0 justify-start px-4"
            >
              <Link href={`/${chatId}`}>{chatName}</Link>
            </Button>
          );
        })}
    </>
  );
};

export default Chats;
