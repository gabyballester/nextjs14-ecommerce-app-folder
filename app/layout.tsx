import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          {/* <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          // disableTransitionOnChange
          themes={["orange", "orange-dark", "light", "dark"]}
        >
          {children}
        </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
