import React from "react";
import { Text } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Header = () => {
  return (
    <header className="sticky flex items-center justify-between dark:bg-[#131110]">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Text width={20} height={20} />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[260px] p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
      <Select>
        <SelectTrigger className="w-[180px] h-10">
          <SelectValue placeholder="ChatVirtuoso 3.5" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-3.5-turbo">ChatVirtuoso 3.5</SelectItem>
          <SelectItem value="gpt-4" disabled>
            ChatVirtuoso 4
          </SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
};

export default Header;
