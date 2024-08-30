import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeManager from "@/components/root/ThemeManager";

//redux
import { ReduxProvider } from "@/redux/Provider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PawPal Community",
  description: "PawPal Community: Red Social para el Bienestar Animal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Aplica el tema de Material UI */}
        <ReduxProvider>
          <ThemeManager>
            {children}
          </ThemeManager>
        </ReduxProvider>
      </body>
    </html>
  );
}
