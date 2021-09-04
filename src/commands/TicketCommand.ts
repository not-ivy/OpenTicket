import { Client, Message, MessageEmbed } from 'discord.js';
import {BotColors, InterfaceTicket} from '../util';

module.exports.run = async (client: Client, message: Message, args: string[]) => {
  const ticketMessage: InterfaceTicket = JSON.parse(args.join(' ').replace('`', ''));
  const ticketEmbed = new MessageEmbed()
    .setTitle(ticketMessage.title)
    .setDescription(ticketMessage.description)
    .setColor(BotColors.Pink)
    .setFooter('OpenTicket');
  message.channel.send({ embeds: [ticketEmbed] });
};

module.exports.config = {
  name: 'ticket',
};
