"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

const Logout = () => {
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      });
      toast("Logged out successfully. 👋");
    } catch (error) {
      toast("Error signing out.");
    }
  };

  let content;
  if (status === "loading") {
    content = (
      <Button variant="outline" disabled>
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Logout
      </Button>
    );
  } else {
    content = session ? (
      <Button variant="outline" onClick={handleLogout} aria-label="Logout">
        Logout {session.user?.name}
      </Button>
    ) : null;
  }

  return <>{content}</>;
};

export default Logout;
