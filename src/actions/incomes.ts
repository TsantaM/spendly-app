"use server"

import { PrismaClient } from "../generate/prisma"
const prisma = new PrismaClient()

// Get All Incomes

export async function GetAllIncomes({id} : {id: string}) {
    const result = await prisma.incomes.findMany({
        where: {
            UserId: id
        },

    })

    return result
}

// Add a new incomes

export async function AddIncomes({
    motif, montant, id, date
}: {
    motif: string,
    montant: number,
    id: string,
    date: Date
}) {
    await prisma.incomes.create({
        data: {
            motif: motif,
            montant: montant,
            user: {
                connect: {
                    id: id
                }
            },
            date: date
        }
    })
}

// Update one Incomes

export async function UpdateIncomes({
    id, motif, montant, date
}: { id: string, motif: string, montant: number, date: Date }) {
    await prisma.incomes.update({
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

// Delete One Incomes

export async function DeleteIncomes({ id }: { id: string }) {
    await prisma.incomes.delete({
        where: {
            id: id
        }
    })
}

// Calcule du total des revenues

export async function TotalIncomes({ id }: {id: string}) {
    const total = prisma.incomes.aggregate({
        where: {
           UserId : id
        },
        _sum: {
            montant: true
        }
    })

    return total
}