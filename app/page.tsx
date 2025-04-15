import { CustomLink } from '@/src/components/ui/components/link';
import './page.css'

export default function Home() {

  return (
    <>

    <section id="section1">
      <div className="s1content">
      <div className="title">
          <h1 className='center-title'>Spendly</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ratione iusto earum quas totam, rem, reiciendis quae eaque dolorum corrupti, similique cumque a minus saepe!</p>
        </div>

        <div className="buttons">
          <CustomLink href='/inscription' content='Inscrivrez-vous gratuitement' variant="primary"/>
          <CustomLink href='/connexion' content='Connectez-vous à votre compte' variant="secondary"/>
        </div>
      </div>
    </section>
    </>    
  );
}
