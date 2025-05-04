"use client"

import { useEffect } from 'react'
import '../styles/cards-sold.css'
import { TotalDepenses } from '@/src/actions/depenses'
import { useSessionStore } from '@/src/store/useSessionStore'
import { useBudget, useDepenseTotal, useIncomesTotal } from '@/src/store/useTotals'
import { TotalIncomes } from '@/src/actions/incomes'





export default function CardsSold() {

  const { user } = useSessionStore()
  const {total, updater} = useDepenseTotal()
  const {totalIncomes, updaterIncomes} = useIncomesTotal()
  const {budgetFinal, updaterBudget} = useBudget()

  useEffect(() =>{
    const getTotalIncomes = async(id: string) => {
      const total_result_incomes = await TotalIncomes({id})
      console.log(total_result_incomes)
      if(total_result_incomes._sum.montant) {
        updaterIncomes(total_result_incomes._sum.montant)
      }
    }

    if(user) {
      getTotalIncomes(user.id)
    }
  }, [updaterIncomes, user])


  useEffect(() => {
    const getTotalDepenses = async (id: string) => {
      const total_result = await TotalDepenses({ id })
      console.log(total_result);
      if (total_result._sum.montant) {
        updater(total_result._sum.montant)
      }
    }
    if (user) {
      getTotalDepenses(user.id)
    }
  }, [updater, user])


  useEffect(() => {
    const budget = totalIncomes - total
    if(budget <= 0) {
      updaterBudget(0)
    }else {
      updaterBudget(budget)
    }
  }, [totalIncomes, total, updaterBudget])

  return (
    <section id="cards-sold">
      <div className="bentos spending">
        <h2>Mes Revenues</h2>
        <p><span>{totalIncomes}</span> Ar</p>
      </div>
      <div className="bentos incomes">
        <h2>Mes Dépenses</h2>
        <p><span>{total}</span> Ar</p>
      </div>
      <div className="bentos reste">
        <h2>Budget actuel</h2>
        <p><span>{budgetFinal}</span> Ar</p>
      </div>
    </section>
  )
}