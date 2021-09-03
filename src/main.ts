import { Client, Intents } from 'discord.js';
import { token } from '../config';

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.once('ready', () => {
  console.log('ready');
});

bot.login(token).then(null);
