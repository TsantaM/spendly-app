
import type { Metadata } from "next";
import "./globals.css";
import 'react-datepicker/dist/react-datepicker.css';
import ThemeManager from "@/src/components/ui/components/ThemeManager";

export const metadata: Metadata = {
  title: "Spendly - Finance Traker",
  description: "Application de suivie de dépences et de revenues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={""}>
        <ThemeManager />
          {children}
      </body>
    </html>
  );
}