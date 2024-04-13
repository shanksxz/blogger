"use server"

import { getServerSession } from 'next-auth';
import { db as prisma } from '~/server/db';

export const authenticateUser = async () => {
    try {
        const session = await getServerSession();

        console.log(session)

        if (!session?.user?.email) {
            return null;
        }

        const user = await prisma.user.findFirst({
            where: {
                email : session.user.email,
            },
        });

        console.log("User from bd", user)

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}