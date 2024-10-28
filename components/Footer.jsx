import Link from "next/link";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold">Tash Mode</h2>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <Link href="/research" className="hover:underline">
            Research
          </Link>
          <Link href="/archive" className="hover:underline">
            Archive
          </Link>
        </div>
        <nav>
          <h2 className="footer-title text-lg font-bold">Follow us</h2>
          <div className="grid grid-flow-col gap-4 mt-5">
            <SocialIcon
              url="https://twitter.com"
              target="_blank"
              style={{ height: 40, width: 40 }}
            />

            <SocialIcon
              url="http://youtube.com"
              target="_blank"
              style={{ height: 40, width: 40 }}
            />

            <SocialIcon
              url="http://instagram.com"
              target="_blank"
              style={{ height: 40, width: 40 }}
            />
          </div>
        </nav>

        <div className="mt-4 md:mt-0 md:flex md:flex-col md:justify-end md:items-end">
          <Link href="/admin" className="hover:underline">
            Admin Dashboard
          </Link>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} Tash Mode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
