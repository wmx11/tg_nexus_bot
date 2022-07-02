import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAdministrationMessageByType = async (type: string) => {
    const message = await prisma.content.findFirst({
        where: {
            type,
        },
    });

    return message?.content;
};
export default getAdministrationMessageByType;
