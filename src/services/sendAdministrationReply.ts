import config from '../config';
import getAdministrationMessageByType from './getAdministrationMessageByType';

const messagesMap = new Map();

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

    const replyMessage = await ctx.reply(`${username}. ${message}`);

    if (replyMessage) {
        messagesMap.set(replyMessage.message_id, {
            destory: setTimeout(() => {
                try {
                    ctx.deleteMessage(replyMessage.message_id);
                    messagesMap.delete(replyMessage.message_id);
                } catch (error) {
                    messagesMap.delete(replyMessage.message_id);
                    console.log(error);
                }
            }, config.messageDeleteTiemout),
        });
    }

    return replyMessage;
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
