import getAdministrationMessageByType from './getAdministrationMessageByType';

const sendReplyToUser = (ctx: any) => async (id: string, type: string) => {
    if (!id) {
        return;
    }

    const userId = parseInt(id, 10);

    const chatMember = userId
        ? await ctx.getChatMember(userId)
        : id.startsWith('@')
        ? id
        : null;

    if (!chatMember) {
        return;
    }

    const username = chatMember.hasOwnProperty('user')
        ? `@${chatMember.user.username}`
        : chatMember;

    const message = await getAdministrationMessageByType(type);

    if (!message) {
        return ctx.reply(
            `No custom message for ${type} found. Please add a custom message`
        );
    }

    return ctx.reply(`${username}. ${message}`);
};

const sendAdministrationReply = async (ctx: any, type: string) => {
    if (!ctx) {
        return;
    }

    const message = ctx.update.message;
    const replyToMessage = message.reply_to_message;
    const reply = sendReplyToUser(ctx);

    if (replyToMessage) {
        return reply(replyToMessage.from.id, type);
    }

    if (!message) {
        return;
    }

    const [, userInfo] = message.text.split(' ');

    return reply(userInfo, type);
};

export default sendAdministrationReply;
