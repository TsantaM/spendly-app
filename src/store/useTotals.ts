import { create } from "zustand";

type TotalDepenses = {
    total: number,
    updater: (montant: number) => void
}

type TotalIncomes = {
    totalIncomes: number,
    updaterIncomes: (montant: number) => void
}

type Budget = {
    budgetFinal: number,
    updaterBudget: (montant: number) => void
}

export const useDepenseTotal = create<TotalDepenses>()(
    (set) => ({
        total: 0,
        updater: (montant: number) => (
            set(() => (
                {total: montant}
            ))
        )
    })
)

export const useIncomesTotal = create<TotalIncomes>() (
    (set) => ({
        totalIncomes: 0,
        updaterIncomes: (montant: number) => (
            set(() => (
                {totalIncomes: montant}
            ))
        )
    })
)

export const useBudget = create<Budget>() (
    (set) => ({
        budgetFinal: 0,
        updaterBudget: (montant: number) => (
            set(() => (
                {budgetFinal: montant}
            ))
        )
    })
)