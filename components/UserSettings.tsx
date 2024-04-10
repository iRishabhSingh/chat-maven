"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Logout from "./logout";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const UserSettings = () => {
  const { data: session } = useSession();
  const isLoggedIn = session && session.user;

  return (
    <div className="absolute bottom-4 mx-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[236px] h-12 border rounded-md border-[#e4e4e7] dark:border-[#27272B] hover:bg-[#0000000f] dark:hover:bg-[#292524]">
          {isLoggedIn ? session.user?.name : "Create Account"}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[236px]">
          <DropdownMenuLabel className="text-[#808080] text-center font-normal">
            {isLoggedIn ? session.user?.email : "You are not signed in!"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center justify-evenly gap-4">
            <span>Theme</span>
            <ModeToggle />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            {isLoggedIn ? (
              <Logout />
            ) : (
              <Button variant="outline" className="w-full h-12">
                <Link href="/auth">Login or Signup</Link>
              </Button>
            )}
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserSettings;
