'use client'

import '../styles/depenses-revenus-landing.css'
import { AddIncomes, DeleteIncomes, GetAllIncomes, TotalIncomes } from "@/src/actions/incomes";
import { Button } from "@/src/components/ui/components/button";
import Input, { DatePickerInput } from "@/src/components/ui/components/input";
import { useSessionStore } from "@/src/store/useSessionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { CardsInSpend } from "../_components/incomes-and-spend-cards";
import { useIncomesTotal } from '@/src/store/useTotals';

const incomesSchema = z.object({
    motif: z.string().min(3, "Veuillez enter l'origine du revenu'"),
    montant: z.coerce.number().positive("Veuillez entrer le montant encaissé"),
    date: z.coerce.date().optional()
})


type incomes = {
    motif: string;
    montant: number;
    date: Date;
    id: string;
    UserId: string;
    createdAt: Date;
}

export type IncomesFormSchema = z.infer<typeof incomesSchema>

export default function Revenues() {
    const [incomes, setIncomes] = useState<incomes[]>([])

    const { user } = useSessionStore()

    const { updaterIncomes} = useIncomesTotal()
    
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<IncomesFormSchema>({ resolver: zodResolver(incomesSchema) })

    const onSubmit = async (formData: IncomesFormSchema) => {
        console.log(formData);
        const motif = formData.motif
        const montant = formData.montant
        const date = formData.date ? formData.date : new Date()
        const id = user?.id
        if (id) {
            await AddIncomes({ motif, montant, date, id })
            getIncomes(user.id)
            reset()
            getTotalIncomes(user.id)
        }
    }

    const getIncomes = async (id: string) => {
        const results = await GetAllIncomes({ id })
        console.log(results);
        setIncomes(results)
    }

    const getTotalIncomes = async (id: string) => {
        const total_result_incomes = await TotalIncomes({ id })
        console.log(total_result_incomes)
        if (total_result_incomes._sum.montant) {
            updaterIncomes(total_result_incomes._sum.montant)
        }else {
            updaterIncomes(0)
        }
    }

    const deleter = async (id: string) => {
        await DeleteIncomes({ id })
        if (user) {
            getIncomes(user.id)
            getTotalIncomes(user.id)
        }
    }

    useEffect(() => {
        if (user) {
            getIncomes(user.id)
        }
    }, [user])

    return (
        <>
            <section id="depenses-landing">
                <h2>Ajouter une somme encaissé</h2>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <Input placeholder="Origine de l'argent" type="text" register={register("motif")} />
                        {errors.motif && <p>{errors.motif.message}</p>}
                        <Input placeholder="Montant encaissé" type="number" register={register("montant")} />
                        {errors.montant && <p>{errors.montant.message}</p>}
                        <DatePickerInput control={control} name="date" />
                    </div>

                    <Button content={isSubmitting ? "Submiting in process" : "Ajouter"} variant="primary" state="hover" />
                </form>
            </section>

            <section id='depenses-list'>
                <div className="list-container s3-grid">
                    {!incomes.length ? <p>Aucune rentrée de fond trouvée</p> : incomes.map((s) => <CardsInSpend key={s.id} date={s.date} title={s.motif} montant={s.montant} event={() => (deleter(s.id))} />)}
                </div>
            </section>
        </>
    )
}