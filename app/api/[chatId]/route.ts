import User from "@/models/User";
import Chat from "@/models/Chat";
import connect from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _request: NextRequest,
  { params: chatId }: { params: { chatId: string } }
) => {
  await connect();

  try {
    const chat = await Chat.find();
    return NextResponse.json({ chat }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

export const POST = async (
  request: NextRequest,
  chatId: string,
  content: string
) => {
  await connect();

  try {
    // Check if the user with the provided chat exists
    const userWithChat = await User.findOne({ chats: { $in: [chatId] } });

    if (!userWithChat) {
      return new NextResponse(
        "Chat not found at this route. Consider initiating a new chat instead.",
        { status: 404 }
      );
    }

    // Find the chat by its ID
    const chat = await Chat.findOne({ chatId });

    if (!chat) {
      return new NextResponse("Chat not found!", { status: 404 });
    }

    // Extract sender from the request
    const { sender } = await request.json();

    // Push the new messages to the messages array of the chat
    chat.messages.push({ sender: "user", content: sender });
    chat.messages.push({ sender: "agent", content });

    // Save the updated chat document
    await chat.save();

    return new NextResponse("Message added to chat!", { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("An error occurred. Please try again later.", {
      status: 500,
    });
  }
};
