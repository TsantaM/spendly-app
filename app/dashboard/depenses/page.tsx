"use client"

import '../styles/depenses-revenus-landing.css'
import { AddSpending, DeleteSpending, GetSpending, TotalDepenses } from "@/src/actions/depenses";
import { Button } from "@/src/components/ui/components/button";
import Input, { DatePickerInput } from "@/src/components/ui/components/input";
import { prisma } from "@/src/config/lib/prisma";
import { useSessionStore } from "@/src/store/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardsInSpend } from '../_components/incomes-and-spend-cards';
import { useDepenseTotal } from '@/src/store/useTotals';

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

    const [spendings, setSpendings] = useState<spends[]>([])
    console.log(prisma);
    const { user } = useSessionStore()
    const {updater} = useDepenseTotal()

    const getTotalDepenses = async (id: string) => {
        const total_result = await TotalDepenses({ id })
        console.log(total_result);
        if (total_result._sum.montant) {
            updater(total_result._sum.montant)
        }else {
            updater(0)
        }
    }

    const spending = async (id: string) => {
        const results = await GetSpending({ id })
        console.log(results);
        setSpendings(results)
    }
    
    const deleter = async(id: string) => { 
      await DeleteSpending({id})
      if(user) {
        getTotalDepenses(user.id)
        spending(user.id)
      }
    }

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<depenseFormSchema>({ resolver: zodResolver(depensesSchema) })

    const onSubmit = async (formData: depenseFormSchema) => {
        console.log(formData);
        const motif = formData.motif
        const montant = formData.montant
        const date = formData.date ? formData.date : new Date()
        const id = user?.id
        if (id) {
            await AddSpending({ motif, montant, date, id })
            reset()
            spending(user.id)
            getTotalDepenses(user.id)
        }
    }

    useEffect(() => {
        if (user) {
            spending(user.id)
        }
    }, [user])

    return (
        <>
            <section id="depenses-landing">
                <h2>Ajouter une nouvelle dépense</h2>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <Input placeholder="Motif de la dépenses" type="text" register={register("motif")} />
                        {errors.motif && <p>{errors.motif.message}</p>}
                        <Input placeholder="Montant de la dépense" type="number" register={register("montant")} />
                        {errors.montant && <p>{errors.montant.message}</p>}
                        <DatePickerInput control={control} name="date" />
                    </div>

                    <Button content={isSubmitting ? "Submiting in process" : "Ajouter"} variant="primary" state="hover" />
                </form>
            </section>

            <section id='depenses-list'>
                <div className="list-container s3-grid">
                    {!spendings.length ? <p>Aucune dépense trouvée</p> : spendings.map((s) => <CardsInSpend key={s.id} date={s.date} title={s.motif} montant={s.montant} event={() => (deleter(s.id))} />)}
                </div>
            </section>

        </>
    )
}