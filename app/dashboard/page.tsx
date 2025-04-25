"use client"
import { Button } from "@/src/components/ui/components/button";
// import Link from "next/link";
import { authClient } from "@/src/config/lib/auth-clients";
import { useRouter } from "next/navigation";
import "./styles/dashboard-landing-page.css"
import ToggleTheme from "@/src/components/ui/components/toogleTheme";
import { CustomLink } from "@/src/components/ui/components/link";
import { useSessionStore } from "@/src/store/useSessionStore";


export default function UserInterface() {

    const router = useRouter()
    const sessionUpdater = useSessionStore((state) => state.sessionUpdater)

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    const session = authClient.getSession()
                    console.log(session)
                    sessionUpdater(null, null, false)
                    router.push("/")
                }
            }
        })
    }
    const {
        data: session,
        isPending,
        error,
    } = authClient.useSession();
    const { user } = useSessionStore()


    if (isPending) return (
        <section className="dashboard">
            <p>Chargement...</p>
        </section>
    );

    if (error) return (<section className="dashboard">
        <p>Erreur : {error.message}</p>
    </section>);

    return <section className="dashboard-landing">
        <h1>Bienvenue <span>{session?.user?.name}</span></h1>
        <ToggleTheme />
        <Button event={() => (signOut())} content="Deconnexion" variant="destructive"/>
        <CustomLink href="/" content="Retourner à l'acceuil" variant="ghost" />
        {user ? <p>Bonjour {user.name}</p> : <p>Aucun utilisateur connecté</p>}
    </section>;
}