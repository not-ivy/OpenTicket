/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
import { MessageEmbed } from 'discord.js';

enum ConsoleColors {
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',

  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
  Reset = '\x1b[0m',
  Bold = '\u001B[1m',
}

enum BotColors {
  Red = '#F72585',
  Pink = '#E0ACD5',
  Blue = '#3993DD',
  White = '#F4EBE8',
  Green = '#29E7CD',
  Brown = '#6A3E37',
}

function intColor(botColor: BotColors) {
  return parseInt(botColor.replace('#', ''), 16);
}

function success(message: string) {
  console.log(`   [ ${ConsoleColors.FgGreen}OK${ConsoleColors.Reset} ]      ${message}`);
  return undefined;
}

function embedSuccess(title: string, description: string) {
  return new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setFooter('OpenTicket', 'https://cdn.discordapp.com/avatars/883190707198767194/659671effd31aac4a27370d9e5637749.webp')
    .setTimestamp()
    .setColor(intColor(BotColors.Green));
}

function info(message: string) {
  console.log(`   [ ${ConsoleColors.FgYellow}INFO${ConsoleColors.Reset} ]    ${message}`);
  return undefined;
}

function embedInfo(title: string, description: string) {
  return new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setFooter('OpenTicket', 'https://cdn.discordapp.com/avatars/883190707198767194/659671effd31aac4a27370d9e5637749.webp')
    .setTimestamp()
    .setColor(intColor(BotColors.Blue));
}

function error(message: string) {
  console.log(`   [ ${ConsoleColors.FgRed}FAILED${ConsoleColors.Reset} ]  ${message}`);
  return undefined;
}

function embedError(title: string, description: string, stacktrace: any) {
  return new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .addField('Stacktrace:', <string>stacktrace.stack)
    .setFooter('OpenTicket', 'https://cdn.discordapp.com/avatars/883190707198767194/659671effd31aac4a27370d9e5637749.webp')
    .setTimestamp()
    .setColor(intColor(BotColors.Red));
}

function fatal(message: string) {
  console.log(`   [ ${ConsoleColors.BgRed}${ConsoleColors.Bold}${ConsoleColors.FgBlack}FATAL${ConsoleColors.Reset} ]   ${message}`);
  return undefined;
}

function unverified(message: string) {
  console.log(`   [ ${ConsoleColors.FgMagenta}UNVERIFIED${ConsoleColors.Reset} ]   ${message}`);
}

interface InterfaceConfig {
  token: string,
  prefix: string,
  disallowInThreads: boolean,
  disallowBotMessages: boolean,
  notifyRoles: string[]
}

interface InterfaceTicket {
  title: string,
  description: string
}

interface InterfaceDatabase {
  ticketCount: number,
}

export {
  ConsoleColors,
  BotColors,
  intColor,
  success,
  embedSuccess,
  info,
  embedInfo,
  error,
  embedError,
  fatal,
  unverified,
  InterfaceConfig,
  InterfaceTicket,
  InterfaceDatabase,
};
