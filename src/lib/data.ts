import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function fetchUsers() {
    try{
        const users = await prisma.user.findMany()

        return users
    } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch users')
    }
}