require('dotenv').config({ path: './.env' });

import { Telegraf } from 'telegraf';
import warn from './commands/warn';
import config from './config';
import pipeline from './middleware/pipeline';
import adminRole from './middleware/adminRole';
import setWarnMessage from './commands/setWarnMessage';
import setMuteMessage from './commands/setMuteMessage';
import setBanMessage from './commands/setBanMessage';
import mute from './commands/mute';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

const commands = config.commands;

// Listeners
bot.command(commands.mute, (ctx) => pipeline(ctx, adminRole, mute) as any);
bot.command(commands.warn, (ctx) => pipeline(ctx, adminRole, warn) as any);

// Setters
bot.command(
    commands.setWarnMessage,
    (ctx) => pipeline(ctx, adminRole, setWarnMessage) as any
);
bot.command(
    commands.setMuteMessage,
    (ctx) => pipeline(ctx, adminRole, setMuteMessage) as any
);
bot.command(
    commands.setBanMessage,
    (ctx) => pipeline(ctx, adminRole, setBanMessage) as any
);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
