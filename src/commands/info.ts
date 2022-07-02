import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

const info = async (ctx: any) => {
    try {
        const memeberId = ctx?.update?.message?.reply_to_message?.from?.id;

        if (!memeberId) {
            return;
        }

        const member = await ctx.getChatMember(memeberId as number);

        if (!member) {
            return;
        }

        const { id, first_name, last_name, username, language_code } =
            member.user;

        const memberData = await prisma.user.findFirst({
            where: {
                user_id: id,
            },
        });

        if (!memberData) {
            return;
        }

        const { joined, message_count, last_message, warnings } = memberData;

        const items = [];

        if (id) {
            items.push(`🆔​<b>ID</b>: ${id}`);
        }

        if (first_name) {
            items.push(`​👦<b>Name</b>: ${first_name}`);
        }

        if (last_name) {
            items.push(`👪<b>Surname</b>: ${last_name}`);
        }

        if (username) {
            items.push(`🌐<b>Username</b>: @${username}`);
        }

        if (language_code) {
            items.push(
                `<b>Language</b>: ${new Intl.DisplayNames([language_code], {
                    type: 'language',
                }).of(language_code)}`
            );
        }

        if (message_count) {
            items.push(`💬<b>Messages</b>: ${message_count}`);
        }

        if (last_message) {
            items.push(
                `💬<b>Last Message</b>: ${format(
                    new Date(last_message),
                    'yyyy-MM-dd HH:mm'
                )}`
            );
        }

        if (joined) {
            items.push(
                `💬<b>Joined</b>: ${format(
                    new Date(joined),
                    'yyyy-MM-dd HH:mm'
                )}`
            );
        }

        if (warnings) {
            items.push(`💬<b>Warnings</b>: ${warnings}`);
        }

        const message = items.join('\n');

        ctx.replyWithHTML(message);
    } catch (error) {
        console.log(error);
    }
};
export default info;
