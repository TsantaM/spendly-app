"use client"

import { CustomLink } from '@/src/components/ui/components/link';
import './page.css'
import ToggleTheme from '@/src/components/ui/components/toogleTheme';
import { authClient } from "@/src/config/lib/auth-clients";
import {useSessionStore} from "@/src/store/useSessionStore"

export default function Home() {

  const session = authClient.useSession()
  const {user} = useSessionStore()

  return (
    <>

    <section id="section1">
      <div className="background-effect"></div>
      <div className="s1content">
      <div className="title">
          <h1 className='center-title'>Spendly</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ratione iusto earum quas totam, rem, reiciendis quae eaque dolorum corrupti, similique cumque a minus saepe!</p>
          <ToggleTheme/>
        </div>

        <div className="buttons">
          <CustomLink href='/inscription' content='Inscrivrez-vous gratuitement' variant="primary"/>
          <CustomLink href='/connexion' content='Connectez-vous à votre compte' variant="secondary"/>
        </div>

        {session.data ? <CustomLink href="/dashboard" content={session.data?.user.name} variant="ghost"/> : <p>Aucun utilisateur connecté</p>}
        {user? <p>Bonjour {user.name}</p> : <p>Aucun utilisateur connecté</p>}

      </div>
    </section>
    </>    
  );
}
