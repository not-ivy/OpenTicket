/* eslint-disable consistent-return */
import { Client, Intents } from 'discord.js';
import * as fs from 'fs';
import {
  error,
  info,
  success,
  fatal,
  InterfaceConfig, unverified,
} from './util';

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
  const commandFiles = files.filter((file) => file.split('.').pop() === 'js');
  if (commandFiles.length === 0) return fatal('The commands folder is empty! Add some commands!');
  commandFiles.forEach((file, index) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const pull = require(`./commands/${file}`);
    info(`Verifying ${file}... (${index + 1}/${commandFiles.length})`);
    if (pull.config) {
      if (commands.has(pull.config.name)) error('Another command with the same name exists! Overwriting...');
      commands.set(pull.config.name, pull);
      success(`Command ${file} verified!`);
    } else {
      error(`Command ${file} does not have a config property, file ignored.`);
    }
  });
  success(`${commands.size} commands registered!`);
  info('Connecting to discord...');
});

const eventFiles = fs.readdirSync('./dist/events').filter((file) => file.endsWith('.js'));
eventFiles.forEach((file) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const event = require(`./events/${file}`);
  eventFiles.forEach((eventFile, i) => unverified(`${eventFile} event file added... (${i + 1}/${eventFiles.length})`));
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args));
  } else {
    bot.on(event.name, (...args) => event.execute(...args));
  }
});

bot.once('ready', async () => {
  success('Connected to discord. Welcome to OpenTicket!');
});

bot.login(config.token).catch(() => fatal('Failed to connect to discord!'));

export {
  config,
  commands,
  bot,
};
