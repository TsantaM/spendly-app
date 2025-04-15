"use client"
import { Button } from "@/src/components/ui/components/button";
// import Link from "next/link";
import { authClient } from "@/src/config/lib/auth-clients";
import { useRouter } from "next/navigation";
import "./dashboard.css"
import ToggleTheme from "@/src/components/ui/components/toogleTheme";


export default function UserInterface() {

    const router = useRouter()

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/connexion")
                }
            }
        })
    }
    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession();

    if (isPending) return (
        <section className="dashboard">
            <p>Chargement...</p>
        </section>
    );
    if (error) return (<section className="dashboard">
        <p>Erreur : {error.message}</p>
    </section>);

    return <section className="dashboard">
        <h1>Bienvenue <span>{session?.user?.name}</span></h1>
        <ToggleTheme/>
        <Button event={() => (signOut())} content="Deconnexion" />
    </section>;
}