"use client"
// import Link from "next/link";
import { authClient } from "@/src/config/lib/auth-clients";
import "./styles/dashboard-landing-page.css"
import ToggleTheme from "@/src/components/ui/components/toogleTheme";


export default function UserInterface() {

    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession();


    if (isPending) return (
        <section className="dashboard-landing">
            <p>Chargement...</p>
        </section>
    );

    if (error) return (<section className="dashboard">
        <p>Erreur : {error.message}</p>
    </section>);

    return <section className="dashboard-landing">
        <h1>Bienvenue <span>{session?.user?.name}</span></h1>
        <ToggleTheme />
    </section>;
}