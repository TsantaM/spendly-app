import '../styles/header.css'
import { CustomLink } from "@/src/components/ui/components/link";

export default function HeaderDashboard() {
    return (

        <div className="sidebar">
            <div className="sidebar_header">
                <h1>Dashboard</h1>
            </div>

            <nav>
                <ul>
                    <li>
                        <CustomLink href="/dashboard" content="Acceuil" variant="ghost" />
                    </li>
                    <li>
                        <CustomLink href="/dashboard/depenses" content="Mes dépenses" variant="ghost" />
                    </li>
                    <li>
                        <CustomLink href="/dashboard/revenues" content="Mes revenus" variant="ghost" />
                    </li>
                </ul>
            </nav>
        </div>

    )
}