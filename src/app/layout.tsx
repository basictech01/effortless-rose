import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";


const tinos = Roboto({
  weight: "700",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Effortless rose",
  description: "Keeping the meaning of the rose alive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tinos.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
