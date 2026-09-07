import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "ONTIVA - Luxury Accessories",
  description: "High-end luxury accessories for discerning clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${inter.className} ${playfairDisplay.className} antialiased bg-luxury-dark text-white`}>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}

