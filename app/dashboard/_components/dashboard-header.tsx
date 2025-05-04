"use client"

import { CustomLink } from '@/src/components/ui/components/link'
import '../styles/dashboard-header.css'
import { authClient } from '@/src/config/lib/auth-clients'
import { useSessionStore } from "@/src/store/useSessionStore";
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/components/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';


export default function DashboardHeader() {

    const router = useRouter()
    const sessionUpdater = useSessionStore((state) => state.sessionUpdater)

    const [show, setShow] = useState(false)

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

    const toggler = () => {
        setShow(!show)
        console.log(show);
    }

    const Class = show ? 'active' : ''

    return (
        <>
            <header id='dashboard-header' className={ Class }>
                <nav>
                    <ul>
                        <li>
                            <CustomLink href="/" content="Accueil" variant="ghost" />
                        </li>
                        <li>
                            <CustomLink href="/dashboard" content="Mes informations" variant="ghost" />
                        </li>
                        <li>
                            <CustomLink href="/dashboard/revenues" content="Mes revenus" variant="ghost" />
                        </li>
                        <li>
                            <CustomLink href="/dashboard/depenses" content="Mes dépenses" variant="ghost" />
                        </li>
                    </ul>
                </nav>

                <Button event={() => (signOut())} content="Deconnexion" variant="destructive" state="hover" />
            </header>

            <Button variant='primary' content={<Menu />} otherclass='togglebtn' event={() => (toggler())}/>

        </> 
    )
}