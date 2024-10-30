"use client";
import logo from "@/assets/images/Logo_Black_no_text.png";
import profileImg from "@/assets/images/profile.png";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const { cartItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-2">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Open Main Menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link className="flex items-center" href="/">
              <Image className="h-10 w-auto" src={logo} alt="Tash Mode Logo" />
              <span className="text-black text-2xl font-bold ml-2">
                Tash Mode
              </span>
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex md:flex-1 justify-center space-x-4">
            <Link
              href="/tashmode"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } rounded-md px-3 py-2`}
            >
              Shop Tash Mode
            </Link>
            <Link
              href="/category"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } rounded-md px-3 py-2`}
            >
              Shop by Category
            </Link>
            <Link
              href="/culture"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } rounded-md px-3 py-2`}
            >
              Shop by Culture
            </Link>
          </div>

          {/* Right side menu */}
          <div className="flex items-center space-x-4">
            {!session && providers && (
              <button
                className="hidden md:flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2"
                onClick={() => signIn(providers.google.id)}
              >
                <FaGoogle className="mr-2" />
                <span>Login or Register</span>
              </button>
            )}

            {/* Profile dropdown button */}
            {session && (
              <div className="relative flex items-center space-x-4">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-expanded={isProfileMenuOpen ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={session.user.image || profileImg}
                    alt="User Profile"
                    width={40}
                    height={40}
                  />
                </button>
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={handleProfileClick}
                    >
                      Your Profile
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
                {/* Cart Icon */}
                <Link
                  href="/cart"
                  className="relative text-gray-600 hover:text-black"
                >
                  <FaShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/tashmode"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } block rounded-md px-3 py-2`}
            >
              Shop Tash Mode
            </Link>
            <Link
              href="/category"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } block rounded-md px-3 py-2`}
            >
              Shop by Category
            </Link>
            <Link
              href="/culture"
              className={`${
                pathname === "/products"
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-900 hover:text-white"
              } block rounded-md px-3 py-2`}
            >
              Shop by Culture
            </Link>

            {/* Login Button (if not logged in) */}
            {!session && providers && (
              <button
                className="flex items-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2"
                onClick={() => signIn(providers.google.id)}
              >
                <FaGoogle className="mr-2" />
                <span>Login or Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
