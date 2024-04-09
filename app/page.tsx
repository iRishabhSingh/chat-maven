import Logout from "@/components/logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <aside>
        <span>Sidebar</span>
        <ModeToggle />
        <Logout />
      </aside>
      <main>
        <span>chat section</span>
        <Link href={"/auth"}>Login</Link>
      </main>
    </>
  );
}
