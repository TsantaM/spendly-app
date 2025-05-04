import { create } from "zustand";
import { authClient } from "../config/lib/auth-clients";
import { ErrorContext } from "better-auth/react";
import { toast } from "react-toastify";

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
}

export interface Session {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
}

type SessionStore = {
    user: User | null,
    session: Session | null,
    isPending: boolean;
    error: ErrorContext | null,
    refetch?: () => void,
    success: boolean,
    sessionUpdater: (user: User | null, session: Session | null, success: boolean) => void,
    login: (email: string, password: string) => Promise<void>,
    signUp: (name: string, email: string, password: string) => Promise<void>
}


export const useSessionStore = create<SessionStore>()(

    (set) => ({
        user: null,
        session: null,
        isPending: false,
        error: null,
        success: false,
        sessionUpdater: (user, session, success) => (
            set(() => ({
                user: user,
                session: session,
                success: success
            }))
        ),

        login: async (email, password) => {
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
                        onSuccess: async () => {
                            try {
                                const { data: session, error } = await authClient.getSession()

                                if (error || !session) {
                                    console.log("erreur !" + error);
                                }

                                if (session) {
                                    set({
                                        user: session.user,
                                        session: session.session,
                                    })
                                }

                                set({
                                    success: true
                                })

                            } catch (err) {
                                console.error("C'est moi !" + err)
                            }
                        },
                        onError: async () => {
                            toast.error("Adresse mail ou mot de passe invalide")
                        },
                    }
                )
            } catch (err) {
                console.error("Une exception s'est produite :", err);
            }
        },

        signUp: async (name, email, password) => {
            try {
               await authClient.signUp.email(
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
                    onSuccess: async () => {
                        toast.success("Félicitations ! Inscription réussite !")
                    },
                    onError: (ctx) => {
                      // Afficher le message d'erreur
                      alert(ctx.error.message);
                      console.log(ctx.error.message);
                    },
                  }
                );
              } catch (err) {
                console.error("Une exception s'est produite :", err);
              }
        }

    })
)
