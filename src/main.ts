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

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = new Map<string, any>();

/**
 * Credit to https://github.com/humboldt123
 * @author humboldt123
 */
info('Registering commands...');
fs.readdir('./dist/commands', (err, files) => {
  if (err) return fatal(err.message);
  const tsFiles = files.filter((file) => file.split('.').pop() === 'js');
  if (tsFiles.length === 0) return fatal('The commands folder is empty! Add some commands!');
  tsFiles.forEach((file, index) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const pull = require(`./commands/${file}`);
    info(`Verifying ${file}... (${index + 1}/${tsFiles.length + 1})`);
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

bot.on('message', async (message) => {
  const commandArray = message.content.split(' ');
  const command = commandArray[0].toLowerCase();
  const args = commandArray.slice(1);

  if (config.disallowBotMessages && message.author.bot) return undefined;
  if (config.disallowInThreads && message.channel.isThread) return undefined;

  if (message.content.startsWith(config.prefix)) {
    const commandFile = commands.get(command.slice(config.prefix.length));
    if (commandFile) commandFile.run(bot, message, args);
  }
});

bot.login(config.token).catch(() => fatal('Failed to connect to discord!'));
