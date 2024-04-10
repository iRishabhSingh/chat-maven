import React from "react";
import { Text } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
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
  );
};

export default Header;
