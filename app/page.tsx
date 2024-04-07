import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <>
      <aside>
        <span>Sidebar</span>
        <ModeToggle />
      </aside>
      <main>
        <span>chat section</span>
      </main>
    </>
  );
}
