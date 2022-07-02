import config from '../config';
import sendAdministrationReply from '../services/sendAdministrationReply';

const mute = async (ctx: any) => {
    sendAdministrationReply(ctx, config.commands.mute);
};
export default mute;
