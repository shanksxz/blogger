"use server"
import { authenticateUser } from "./auth"
import { db as prisma } from "~/server/db"

export const getUserByEmail = async(email : string) => {
    try {

        const user = await prisma.user.findFirst({
            where : {
                email
            }
        })

        if(!user) {
            return null;
        }

        return {
            userName : user.name || ''
        }
        
    } catch (error) {
        return null
    }
}