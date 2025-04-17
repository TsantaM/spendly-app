"use client"

import { useSessionStore } from "@/src/store/useSessionStore"
import { useEffect } from "react"
import { authClient } from "@/src/config/lib/auth-clients";
import { Session, User } from "@/src/store/useSessionStore"


export default function GetSessionUserOnLoad() {
    //   const { user } = useSessionStore()
      const sessionUpdater = useSessionStore((state) => state.sessionUpdater)

      useEffect(() => {
        const getSessionInfo = async () => {
          const session = await authClient.getSession();
          sessionUpdater(session.data?.user as User, session.data?.session as Session, true)
        //   console.log(user);
        }
    
        getSessionInfo()
      }, [sessionUpdater])
    
    return null
}