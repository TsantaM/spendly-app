"use server"
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { signForm_type } from "../components/elements/signin/signin";
import { authOptions } from "../config/lib/auth";
import { prisma } from "../config/lib/prisma";

export async function addUser(formData: signForm_type) {
    const { name, email, password } = formData

    try {
        const alreadyExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (alreadyExist) {
            return { success: false, message: "Cet utilisateur existe déjà veuillez utiliser un autre email", state: 'echec'}
        } else {
            try {
                await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: await bcrypt.hash(password, 10),
                    }
                })

                return { success: true, message: "Nouvel utilisateur créée avec succes !", state: 'success' }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
}


export async function getUserInfo(userId: string) {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

export async function getUsers() {

    const session = await getServerSession(authOptions);

    if (!session?.user.id) return [];

    const otherUsers = await prisma.user.findMany({
        where: {
            id: {
                not: session.user.id
            },
            role: {
                not: "admin"
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    return otherUsers;
}