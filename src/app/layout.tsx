import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommerceDrawers from "@/components/launch/CommerceDrawers";
import { products } from "@/data/products";
import SmoothScroll from "@/components/SmoothScroll";
import StoreHydration from "@/components/StoreHydration";
export const metadata: Metadata = {
  title: "ONTIVA — Luxury Accessories",
  description:
    "Timeless jewelry, watches, and accessories. Discover everyday luxury with ONTIVA.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ background: "#0a0a0a", colorScheme: "dark" }}
    >
      <body className="bg-luxury-dark font-sans text-white antialiased">
        <SmoothScroll>
          <StoreHydration />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-black focus:p-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <CommerceDrawers catalog={products} shippingThreshold={150} />
          <Footer />
        </SmoothScroll>
        <noscript>
          <style>{`.motion-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
