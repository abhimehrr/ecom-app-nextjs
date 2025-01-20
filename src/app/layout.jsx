import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { auth } from "@/app/auth";

export const metadata = {
  title: "Ecom | Shre.IN",
  description: "Buy from various range of products",
};

export default async function RootLayout({ children }) {
    const session = await auth();
  
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={`antialiased dark`}>
        <Navbar user={session?.user} />
        <main className="container mx-auto sm:px-4 px-2">{children}</main>
        <Footer />
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
