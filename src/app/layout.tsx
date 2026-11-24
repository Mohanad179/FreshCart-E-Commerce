import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { cn } from "@/lib/utils";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import CartContextProvider from "@/components/providers/CartContextProvider";

const jakarta = localFont({
  src: "../assets/fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});
const bricolage = localFont({
  src: "../assets/fonts/bricolage-grotesque-latin.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Shop quality products with fast delivery from FreshCart.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bricolage.variable}`}>
      <body className="font-sans antialiased overflow-x-clip">

        <AuthProvider>
          <CartContextProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" theme="light" richColors />
          <Footer />
          </CartContextProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
