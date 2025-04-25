"use client"

import { AddSpending, GetSpending } from "@/src/actions/depenses";
import { Button } from "@/src/components/ui/components/button";
import Input, { DatePickerInput } from "@/src/components/ui/components/input";
import { prisma } from "@/src/config/lib/prisma";
import { useSessionStore } from "@/src/store/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const depensesSchema = z.object({
    motif: z.string().min(3, "Veuillez enter le motif de la dépenses"),
    montant: z.coerce.number().positive("Veuillez entrer le montant de votre dépense"),
    date: z.coerce.date().optional()
})

type spends = {
    motif: string;
    montant: number;
    date: Date;
    id: string;
    UserId: string;
    createdAt: Date;
}

export type depenseFormSchema = z.infer<typeof depensesSchema>

export default function Depenses() {

    const [spendings, setSpendings] = useState<spends[]> ([])
    console.log(prisma);
    const {user} = useSessionStore()
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<depenseFormSchema>({ resolver: zodResolver(depensesSchema) })
    const onSubmit = async(formData: depenseFormSchema) => {
        console.log(formData);
        const motif = formData.motif
        const montant = formData.montant
        const date = formData.date? formData.date : new Date()
        const id = user?.id
        if(id) {
            await AddSpending({motif, montant, date, id})
        }
    }



    useEffect(() => {
        const spending = async(id: string) => {
            const results = await GetSpending({id})
            console.log(results);
            setSpendings(results)
        }
        if(user) {
            spending(user.id)
        }
    }, [user])

    return(
        <section className="depenses">
            <div className="content-title">
                <h2>Mes dépenses</h2>
                <p>Gérez ici vos dépenses</p>
            </div>

            <form action="" onSubmit={handleSubmit(onSubmit)}>

                <Input placeholder="Motif de la dépenses" type="text" register={register("motif")} />
                {errors.motif && <p>{errors.motif.message}</p>}
                <Input placeholder="Montant de la dépense" type="number" register={register("montant")} />
                {errors.montant && <p>{errors.montant.message}</p>}
                <DatePickerInput control={control} name="date"/>

                <Button content={isSubmitting? "Submiting in process" : "Ajouter"} variant="primary"/>
            </form>
                

            { !spendings ? <p>Aucune dépense trouvée</p>: <ul>
                    {spendings.map((s) => <li key={s.id}>{s.motif} {s.montant} Ariary</li>)}
                
                </ul>}

        </section>
    )
}