import { Client, Message, MessageEmbed } from 'discord.js';
import { BotColors, intColor } from '../util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.run = async (client: Client, message: Message, args: string[]) => {
  const status = new MessageEmbed()
    .setTitle('Bot status:')
    .setColor(intColor(BotColors.Blue))
    .setDescription(`Uptime: ${Math.floor(client.uptime! / 60000)} minutes.\nWebsocket Heartbeat: ${client.ws.ping}ms.`);
  message.channel.send({ embeds: [status] });
};

module.exports.config = {
  name: 'ping',
};
