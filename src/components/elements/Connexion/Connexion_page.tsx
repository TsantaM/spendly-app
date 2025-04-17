"use client"

import "./Connexion.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import Input from "../../ui/components/input"
import { Button } from "../../ui/components/button"
import { useSession} from "@/src/config/lib/auth-clients"
import { useRouter } from "next/navigation";
import { CustomLink } from "../../ui/components/link"
import { useSessionStore } from "@/src/store/useSessionStore"
import { toast, ToastContainer } from "react-toastify"


const LoginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, 'Veuillez saisir votre mot de passe')
})

type log_type = z.infer<typeof LoginSchema>

export default function Connexion() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<log_type>({ resolver: zodResolver(LoginSchema) })
  const router = useRouter();


  const { login, success, error } = useSessionStore()


  const onSubmit = async (formData: log_type) => {
    const { email, password } = formData
    await login(email, password)
    if (success) {
      router.push("/dashboard")
    }

    if(error) {
      console.log(error);
      toast(error.error.message)
    }
  };

  const session = useSession()
  console.log(session);
  return (

    <section className="sectionform">

      <div className="form_container">
        <div className="text">
          <h1>Welcome Back</h1>
          <p>Connectez vous à votre compte pour traiter vos dépenses et revenues</p>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="form">

          <Input type="email" placeholder="email" register={register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <Input type="password" placeholder="password" register={register("password")} />
          {errors.password && <p>{errors.password.message}</p>}

          {isSubmitting && <p>Submitting in process ...</p>}

          <Button content="Connexion" variant="primary" />

          <CustomLink href="/inscription" content="Je n'ai pas encore de compte" variant="ghost" />

        </form>

      </div>

      <ToastContainer/>

    </section>
  )
}