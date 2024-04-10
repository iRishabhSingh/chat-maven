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

  return (
    <div className="absolute bottom-2 mx-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[236px]">
          <Button variant="outline" className="w-full h-12">
            {session ? session.user?.name : "Create Account"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[236px]">
          <DropdownMenuLabel className="text-[#808080] text-center font-normal">
            {session ? session.user?.email : "mail@example.com"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex items-center justify-evenly gap-4">
            <span>Theme</span>
            <ModeToggle />
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            {session ? (
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
