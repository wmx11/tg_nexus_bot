import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handleCustomMessage = async (
    ctx: any,
    type: string,
    setCommand: string
) => {
    if (!ctx) {
        return;
    }

    const message = ctx.update.message.text;

    if (!message) {
        return ctx.reply('Cannot find the content in the message');
    }

    const content = message.replace(`/${setCommand}`, '');

    if (!content) {
        return ctx.reply(
            'Cannot parse the message. The message might be missing or invalid.'
        );
    }

    const existingMessage = await prisma.content.findFirst({
        where: {
            type: type,
        },
    });

    if (existingMessage) {
        await prisma.content.update({
            data: {
                content,
            },
            where: {
                id: existingMessage.id,
            },
        });

        return ctx.reply(`Message updated for the command /${type}`);
    }

    await prisma.content.create({
        data: {
            type: type,
            content,
        },
    });

    return ctx.reply(`New message created for the command /${type}`);
};

export default handleCustomMessage;
