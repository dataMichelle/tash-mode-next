import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import StripeProvider from "@/components/StripeProvider";

export const metadata = {
  title: "Tash Mode Shopping",
  description: "Global fashion shopping",
  keywords: "fashion, shopping, clothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StripeProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </StripeProvider>
      </body>
    </html>
  );
}
