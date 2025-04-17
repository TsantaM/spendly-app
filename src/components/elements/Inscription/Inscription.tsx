"use client"
import "./Inscription.css"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { feedback_type } from "@/src/types/hook_type";
import { Button } from "../../ui/components/button";
import Input from "../../ui/components/input";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { Session, User, useSessionStore } from "@/src/store/useSessionStore";
import { authClient } from "@/src/config/lib/auth-clients";



const signSchema = z.object({
  name: z.string().min(3, "Le pseudo doit contenir au moins trois caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(7, "Le mot de passe est trop court"),
  confirmPassword: z.string().min(6, "Veuiller resaisir votre mot de passe")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Votre mot de passe ne correspond pas",
  path: ["confirmPassword"]
})

export type signForm_type = z.infer<typeof signSchema>

export default function Inscription() {

  // const [feedBack, setFeedBack] = useState<feedback_type>({
  //   submitting: false,
  //   message: '',
  //   success: false
  // })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<signForm_type>({ resolver: zodResolver(signSchema) })
  const { signUp, success, user } = useSessionStore()
  const sessionUpdater = useSessionStore((state) => state.sessionUpdater)
  const router = useRouter()

  const onSubmit = async (data: signForm_type) => {
    const { name, email, password, } = data;
    await signUp(name, email, password)
    const session = await authClient.getSession();
    console.log(session.data);
    if (session) {
      sessionUpdater(session.data?.user as User, session.data?.session as Session, true)
      console.log(user, success);
    }

    if (success) {
      router.push("/dashboard")
    }
  };



  return (

    <section className="sectionform">

      <div className="form_container">
        <div className="text">
          <h1>Welcome</h1>
          <p>Inscrivez-vous gratuitement et commencez à traiter facilement vos dépenses et revenues</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <Input type="text" placeholder="name" register={register("name")} />
          {errors.name && <p>{errors.name.message}</p>}

          <Input type="email" placeholder="email" register={register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <Input type="password" placeholder="password" register={register("password")} />
          {errors.password && <p>{errors.password.message}</p>}

          <Input type="password" placeholder="confirmPassword" register={register("confirmPassword")} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          {isSubmitting && <p>Submitting in process ...</p>}
          {errors.root && <p>{errors.root.message}</p>}

          <Button content="Inscription" variant="primary" />
        </form>
      </div>

      <ToastContainer />
    </section>

  )
}
