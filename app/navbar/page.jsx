import React from "react";
import Link from "next/link";
import Links from "@/components/Links";
import { Menu } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="flex justify-between h-32 text-2xl p-4 text-white bg-gray-800">
      {/* MOBILE MENU */}
      <div>
        <Menu />
      </div>

      <div>
        <Link href="/">Logo</Link>
      </div>
      <div>
        <Links />
      </div>
      <div>
        <FaGoogle />
        Login or Register
      </div>
    </nav>
  );
};

export default NavBar;
