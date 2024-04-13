import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="md:flex">
      <Sidebar className="hidden md:flex" />
      <main className="relative w-full h-[100vh] flex flex-col gap-2 p-4 bg-[#8080800f]">
        <Header />
        <Separator />
        <div className="flex-grow flex justify-center">
          <p className="w-full md:w-[70%] mx-2 md:mx-0">chat section</p>
        </div>
        <div className="w-full flex justify-center">
          <ChatInput />
        </div>
      </main>
    </div>
  );
}
