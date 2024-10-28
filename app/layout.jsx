import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Tash Mode Shopping",
  description: "Global fashion shopping",
  keywords: "fashion, shopping, clothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
