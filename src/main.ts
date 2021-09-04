/* eslint-disable consistent-return */
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
  prefix: string,
  disallowInThreads: boolean,
  disallowBotMessages: boolean,
}
const config: InterfaceConfig = require('../config.json');

const bot = new Client({
  intents:
    [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
const commands = new Map<string, any>();

/**
 * Credit to https://github.com/humboldt123
 * @author humboldt123
 */
fs.readdir('./dist/commands', (err, files) => {
  info('Registering commands...');
  if (err) return fatal(err.message);
  const jsFiles = files.filter((file) => file.split('.').pop() === 'js');
  if (jsFiles.length === 0) return fatal('The commands folder is empty! Add some commands!');
  jsFiles.forEach((file, index) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const pull = require(`./commands/${file}`);
    info(`Verifying ${file}... (${index + 1}/${jsFiles.length})`);
    if (pull.config) {
      if (commands.has(pull.config.name)) error('Another command with the same name exists! Overwriting...');
      commands.set(pull.config.name, pull);
      success(`Command ${file} verified!`);
    } else {
      error(`Command ${file} does not have a config property, file ignored.`);
    }
  });
  success(`${commands.size} commands fetched!`);
  info('Connecting to discord...');
});

bot.once('ready', async () => {
  success('Connected to discord. Welcome to OpenTicket!');
});

bot.on('messageCreate', async (message) => {
  const commandArray = message.content.split(' ');
  const command = commandArray[0].toLowerCase();
  const args = commandArray.slice(1);
  if (config.disallowBotMessages && message.author.bot) return undefined;
  if (config.disallowInThreads && message.channel.isThread()) return undefined;
  if (command.startsWith(config.prefix)) {
    const commandFile = commands.get(command.slice(config.prefix.length));
    if (commandFile) commandFile.run(bot, message, args);
  }
});

bot.login(config.token).catch(() => fatal('Failed to connect to discord!'));
