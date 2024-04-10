import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="md:flex">
      <Sidebar className="hidden md:flex" />
      <main className="w-full bg-[#8080800f]">
        <header>
          <Header />
        </header>
        <span>chat section</span>
        <Link href={"/auth"}>Login</Link>
      </main>
    </div>
  );
}
