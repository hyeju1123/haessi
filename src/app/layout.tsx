import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";

import "./globals.css";
import Tags from "@/components/Tags";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TagsDrawer from "@/components/TagsDrawer";
import TagsDrawerWrapper from "@/components/TagsDrawerWrapper";

import TagsProvider from "@/provider/TagsProvider";
import ThemeProvider from "@/provider/ThemeProvider";

const gothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "23haessi",
  description: "A blog of 23haessi",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gothic.className}>
      <body className="flex justify-center w-full min-h-screen bg-background">
        <ThemeProvider>
          <TagsProvider>
            <TagsDrawerWrapper>
              <TagsDrawer />
            </TagsDrawerWrapper>
            <section className="flex flex-col w-full max-w-screen-md">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </section>
            <section className="w-auto flex justify-start">
              <Tags />
            </section>
          </TagsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
