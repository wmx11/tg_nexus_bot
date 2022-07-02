import { PrismaClient, User } from '@prisma/client';
import { Member } from '../types/member';
import { Context } from '../types/context';

const prisma = new PrismaClient();

const addNewMember = (ctx: any | Context): void => {
    const newMembers: Member[] = ctx?.message?.new_chat_members;

    if (!newMembers.length) {
        return;
    }

    newMembers.forEach(async (member: Member) => {
        const existingMember: User | null = await prisma.user.findFirst({
            where: {
                user_id: member.id,
            },
        });

        if (!existingMember) {
            await prisma.user.create({
                data: {
                    user_id: member.id,
                },
            });
        }
    });
};

export default addNewMember;
