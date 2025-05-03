import "../styles/incomes-and-spend-cards.css"
import { Button } from "@/src/components/ui/components/button";
import { format } from "date-fns";

export function CardsInSpend({title, date, montant, event}: {
    title: string,
    date: Date,
    montant: number,
    event: React.MouseEventHandler<HTMLButtonElement>
}) {

    return(
        <div className="card">
        <div className="card-content">
          <div className="titles">
            <h3>{title}</h3>
            <small>{format(date, "dd-MMMM-yyyy")}</small>
          </div>
          <p><span>{montant}</span> Ar</p>
        </div>
        <div className="buttons">
            <Button state="hover" variant="destructive" content="Delete" event={event}/>
        </div>
      </div>
    )
}