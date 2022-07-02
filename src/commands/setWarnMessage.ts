import config from '../config';
import handleCustomMessage from '../services/handleCustomMessage';

const setWarnMessage = async (ctx: any) => {
    handleCustomMessage(
        ctx,
        config.commands.warn,
        config.commands.setWarnMessage
    );
};

export default setWarnMessage;
