import './styles/layout.css'
import type { Metadata } from "next";
import HeaderDashboard from "./_components/sidebar";
import DashboardHeader from "./_components/dashboard-header";

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
      <div className="content">
        <DashboardHeader />
        <div className="content_container">
          {children}
        </div>
      </div>
    </>
  );
}