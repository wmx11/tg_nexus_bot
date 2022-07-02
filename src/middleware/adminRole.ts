import { isAdmin } from '../utils';

const adminRole = async (ctx: any, next: () => void) => {
    const hasAdminRole = await isAdmin(ctx);

    if (hasAdminRole) {
        next();
    }

    const messageId = ctx.update.message.message_id;

    if (!messageId) {
        return false;
    }

    ctx.deleteMessage(messageId);

    return false;
};

export default adminRole;
