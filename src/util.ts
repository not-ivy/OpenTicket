/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
enum ConsoleColors {
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '1\x1b[35m',
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

function info(message: string) {
  console.log(`   [ ${ConsoleColors.FgYellow}INFO${ConsoleColors.Reset} ]    ${message}`);
  return undefined;
}

function error(message: string) {
  console.log(`   [ ${ConsoleColors.FgRed}FAILED${ConsoleColors.Reset} ]  ${message}`);
  return undefined;
}

function fatal(message: string) {
  console.log(`   [ ${ConsoleColors.BgRed}${ConsoleColors.Bold}${ConsoleColors.FgBlack}FATAL${ConsoleColors.Reset} ]   ${message}`);
  return undefined;
}

export {
  ConsoleColors,
  BotColors,
  intColor,
  success,
  info,
  error,
  fatal,
};
