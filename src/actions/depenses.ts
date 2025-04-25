"use server"

import { PrismaClient } from "../generate/prisma"
const prisma = new PrismaClient()

// Add a new Spending

export async function AddSpending({
    motif, montant, id, date
}: {
    motif: string,
    montant: number,
    id: string,
    date: Date
} ) {
    await prisma.spending.create({
        data: {
            motif: motif,
            montant: montant,
            user: {
                connect: {
                    id: id
                }
            },
            date: date
        },
    })
}

// Fetch All Spending

export async function GetSpending ({id}: {id: string}) {
    const results = await prisma.spending.findMany({
        where: {
            UserId: id
        }
    })

    return results
}

// Update One Spending

export async function UpdateSpending ({
    id, motif, montant, date
}: {id: string, motif: string, montant: number, date: Date}) {
    await prisma.spending.update({
        where: {
            id: id
        },
        data: {
            motif: motif,
            montant: montant,
            date: date
        }
    })
}

// Delete One Spending

export async function DeleteSpending ({id}: {id: string}) {
    await prisma.spending.delete({
        where: {
            id: id
        }
    })
}

