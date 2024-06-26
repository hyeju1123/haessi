import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import Tags from "@/components/Tags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const gothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gothic.className}>
      <body className="relative flex w-full min-h-screen">
        <nav className="hidden 2xl:block fixed max-w-72 m-16">
          <Tags />
        </nav>
        <div className="flex flex-col w-full max-w-screen-md mx-auto">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
