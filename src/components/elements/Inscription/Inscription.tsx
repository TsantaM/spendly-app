"use client"
import "./Inscription.css"
import { authClient } from "@/src/config/lib/auth-clients"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { feedback_type } from "@/src/types/hook_type";
import { Button } from "../../ui/components/button";
import Input from "../../ui/components/input";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';



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
  const router = useRouter()

  const onSubmit = async (data: signForm_type) => {
    const { name, password, email } = data;

    try {
      const { data: responseData, error } = await authClient.signUp.email(
        {
          email, // user email address
          password, // user password -> min 8 characters by default
          name, // user display name
          callbackURL: "/dashboard"
        },
        {
          onRequest: () => {
            // Afficher un indicateur de chargement
          },
          onSuccess: () => {
            toast.success("Inscription Réussite", {
              className: 'toast',
              draggable: true
            })
            router.push("/dashboard")
          },
          onError: (ctx) => {
            // Afficher le message d'erreur
            alert(ctx.error.message);
            console.log(ctx.error.message);
          },
        }
      );

      if (error) {
        // Gérer l'erreur si nécessaire
        console.error("Erreur lors de l'inscription :", error);
      } else {
        // Gérer la réponse réussie si nécessaire
        console.log("Inscription réussie :", responseData);
      }
    } catch (err) {
      console.error("Une exception s'est produite :", err);
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

      <ToastContainer/>
    </section>

  )
}
