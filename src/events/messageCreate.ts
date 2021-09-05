import { Message } from 'discord.js';
import { bot, commands, config } from '../main';

module.exports = {
  name: 'messageCreate',
  // eslint-disable-next-line consistent-return
  execute(message: Message) {
    const commandArray = message.content.split(' ');
    const command = commandArray[0].toLowerCase();
    const args = commandArray.slice(1);
    if (config.disallowBotMessages && message.author.bot) return undefined;
    if (config.disallowInThreads && message.channel.isThread()) return undefined;
    if (command.startsWith(config.prefix)) {
      const commandFile = commands.get(command.slice(config.prefix.length));
      if (commandFile) commandFile.run(bot, message, args);
    }
  },
};
