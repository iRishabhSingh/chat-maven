"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { LoaderCircle, LogOut } from "lucide-react";

const Logout = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      });
      toast("Logged out successfully. 👋");
    } catch (error) {
      console.error("Error signing out:", error);
      toast("Error signing out.");
    }
  };

  let content;
  if (status === "loading") {
    content = (
      <Button disabled variant="outline" className="w-full max-w-[236px] h-12">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Logging out...
      </Button>
    );
  } else {
    content = session ? (
      <Button
        variant="outline"
        aria-label="Logout"
        onClick={handleLogout}
        className="w-full max-w-[236px] h-12"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    ) : null;
  }

  return <>{content}</>;
};

export default Logout;
