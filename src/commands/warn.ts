import config from '../config';
import sendAdministrationReply from '../services/sendAdministrationReply';

const warn = async (ctx: any) => {
    sendAdministrationReply(ctx, config.commands.warn);
};
export default warn;
