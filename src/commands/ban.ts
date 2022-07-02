import config from '../config';
import sendAdministrationReply from '../services/sendAdministrationReply';

const ban = async (ctx: any) => {
    sendAdministrationReply(ctx, config.commands.ban);
};
export default ban;
