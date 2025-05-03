import './styles/layout.css'
import type { Metadata } from "next";
import DashboardHeader from "./_components/dashboard-header";
import CardsSold from './_components/cards-sold';

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
      <DashboardHeader />
      <CardsSold/>
      {children}
    </>
  );
}