import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Tash Mode Shopping",
  description: "Global fashion shopping",
  keywords: "fashion, shopping, clothing",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
