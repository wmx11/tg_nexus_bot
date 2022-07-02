import config from '../config';
import handleCustomMessage from '../services/handleCustomMessage';

const setMuteMessage = (ctx: any) => {
    handleCustomMessage(
        ctx,
        config.commands.mute,
        config.commands.setMuteMessage
    );
};

export default setMuteMessage;
