import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const rules = (ctx: Context<Update>) => {
    console.log(ctx);

    ctx.reply('stuff');
};
export default rules;
