import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashCard AI",
  description: "Use to generate Flashcards",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
          <Head>
            <title>Flashcard Saas</title>
          </Head>
          <body className={inter.className}>{children}</body> 
      </html>
    </ClerkProvider>
  );
}
