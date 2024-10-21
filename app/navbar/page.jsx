import React from "react";
import Links from "../../components/Links.jsx";

const NavBar = () => {
  return (
    <nav className="flex justify-between h-32 text-2xl p-4 text-white bg-gray-800">
      {/* MOBILE MENU */}

      <div>Logo</div>
      <div>
        <Links />
      </div>
      <div>Login</div>
    </nav>
  );
};

export default NavBar;
