"use client"

import '../styles/dashboard-header.css'
import { useSessionStore } from '@/src/store/useSessionStore'
export default function DashboardHeader() {

  const { user } = useSessionStore()

  return (
    <div className="content_header">
      <h1>Bienvenu {user?.name}</h1>
      <h3>Total Revenus : 0</h3>
      <h3>Total Dépenses : 0</h3>
    </div>
  )
}