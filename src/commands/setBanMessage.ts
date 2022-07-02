import config from '../config';
import handleCustomMessage from '../services/handleCustomMessage';

const setBanMessage = (ctx: any) => {
    handleCustomMessage(
        ctx,
        config.commands.ban,
        config.commands.setBanMessage
    );
};

export default setBanMessage;
