import Link from "next/link";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center p-6">
        <div className="md:flex">
          <Link href="/" className="mr-4 flex items-center">
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
