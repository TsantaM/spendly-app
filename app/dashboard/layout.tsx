
import type { Metadata } from "next";
import HeaderDashboard from "./_components/header";

export const metadata: Metadata = {
  title: "Spendly - Dashboard",
  description: "Application de suivie de dépences et de revenues",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <HeaderDashboard />
      {children}
    </>
  );
}