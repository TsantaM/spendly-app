"use client"

import "./Connexion.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import Input from "../../ui/components/input"
import { Button } from "../../ui/components/button"
import { useSession, authClient } from "@/src/config/lib/auth-clients" 
import { useRouter } from "next/navigation";
import { CustomLink } from "../../ui/components/link"


const LoginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, 'Veuillez saisir votre mot de passe')
})

type log_type = z.infer<typeof LoginSchema>

export default function Connexion() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<log_type>({ resolver: zodResolver(LoginSchema) })
  const router = useRouter()

  const onSubmit = async (formData: log_type) => {
    const { email, password } = formData;

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            // Afficher un indicateur de chargement
          },
          onSuccess: () => {
            router.push("/dashboard")
          },
          onError: (ctx) => {
            alert(ctx.error.message);
            console.error("Erreur lors de la connexion :", ctx.error);
          },
        }
      )
    } catch (err) {
      console.error("Une exception s'est produite :", err);
    }
  };

  const session = useSession()
  console.log(session);
  return (

    <section className="sectionform">

      <div className="form_container">
        <div className="text">
          <h1>Welcome Back</h1>
          <p>Connectez vous à votre compte pour voir vos notes, absences et emploi du temps</p>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="form">

          <Input type="email" placeholder="username" register={register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <Input type="password" placeholder="password" register={register("password")} />
          {errors.password && <p>{errors.password.message}</p>}

          {isSubmitting && <p>Submitting in process ...</p>}

          <Button content="Connexion" variant="primary" />

          <CustomLink href="/inscription" content="Je n'ai pas encore de compte" variant="ghost"/>
        
        </form>

      </div>

    </section>
  )
}