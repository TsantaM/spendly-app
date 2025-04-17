import { CustomLink } from "@/src/components/ui/components/link";

export default function HeaderDashboard () {
    return (

        <header>

            <nav>
                <ul>
                    <li><CustomLink href="/dashboard/depenses" content="Mes dépenses" variant="ghost"/></li>
                    <li><CustomLink href="/dashboard/revenues" content="Mes revenues" variant="ghost"/></li>
                </ul>
            </nav>

        </header>

    )
}