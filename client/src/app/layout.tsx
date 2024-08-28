import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

//redux
import { Provider } from "react-redux";
import store from '../redux/store'
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
