import "./globals.css";
import Navbar from "./navbar/page";
import Footer from "./footer/page";

export const metadata = {
  title: "Tash Mode",
  description: "Online Shopping - Global Products",
  keywords: "Tash Mode, Online Shopping, Global Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
