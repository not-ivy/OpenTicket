import { Client, Intents } from 'discord.js';
import * as fs from 'fs';
import {
  error,
  info,
  success,
  fatal,
} from './util';

// What a mess
interface InterfaceConfig {
  token: string,
  clientId: number,
  guildId: number
}
const config: InterfaceConfig = require('../config.json');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = new Map<string, any>();

info('Registering commands...');
/**
 * Credit to https://github.com/humboldt123
 * @author humboldt123
 */
// eslint-disable-next-line consistent-return
fs.readdir('./dist/commands', (err, files) => {
  if (err) return fatal(err.message);
  const tsFiles = files.filter((file) => file.split('.').pop() === 'js');
  if (tsFiles.length === 0) return fatal('The commands folder is empty! Add some commands!');
  tsFiles.forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const pull = require(`./commands/${file}`); // TODO: is it possible to use import?
    info(`Verifying ${file}...`);
    if (pull.config) {
      commands.set(pull.config.name, pull);
      success(`Command ${file} verified!`);
    } else {
      error(`Command ${file} does not have a config property, file ignored.`);
    }
  });
  success(`${commands.size} commands fetched!`);
});

bot.once('ready', async () => {

});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return undefined;
  switch (interaction.commandName) {
    case 'ping':
      await interaction.reply(`${Math.floor(Math.random() * 1000)}ms.`);
      break;
    case 'createTicket':
      await interaction.reply(`${Math.floor(Math.random() * 1000)}ms.`);
      break;
    default:
      return undefined;
  }
  return undefined;
});

bot.login(config.token).then(success('Bot logged in. Welcome to OpenTicket!'));
