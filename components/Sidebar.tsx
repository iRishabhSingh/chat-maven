import React from "react";
import UserSettings from "./UserSettings";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";
import Link from "next/link";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`flex-shrink-0 overflow-x-hidden w-[260px] h-[100vh] ${className}`}
    >
      <div className="h-full w-[260px]">
        <div className="flex flex-col items-start justify-center h-full relative">
          <Button variant="ghost" className="m-4 w-[200px] md:w-[236px]">
            <Link href="/" className="w-full flex items-center justify-between">
              New chat
              <PenLine width={15} height={15} />
            </Link>
          </Button>
          <nav className="flex flex-col w-[260px] h-[80vh] flex-1 items-center p-3 overflow-y-scroll">
            <p>Sidebar</p>
          </nav>
          <UserSettings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
