import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="md:flex">
      <Sidebar className="hidden md:flex" />
      <main className="relative w-full h-[100vh] flex flex-col gap-2 p-4 bg-[#8080800f]">
        <header className="sticky flex items-center justify-between dark:bg-[#131110]">
          <Header />
          <Select>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue placeholder="ChatVirtuoso 3.5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="legacy">ChatVirtuoso 3.5</SelectItem>
              <SelectItem value="new" disabled>
                ChatVirtuoso 4
              </SelectItem>
            </SelectContent>
          </Select>
        </header>
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
