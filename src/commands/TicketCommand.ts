import {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js';
import { BotColors, embedError, InterfaceTicket } from '../util';

// eslint-disable-next-line consistent-return
module.exports.run = async (client: Client, message: Message, args: string[]) => {
  let ticketMessage: InterfaceTicket;
  try {
    ticketMessage = JSON.parse(args.join(' ').replace('`', ''));
  } catch (e) {
    return message.channel.send({ embeds: [embedError('Failed when parsing json!', 'Verify your json here: https://jsonlint.com/', e)] });
  }
  const ticketEmbed = new MessageEmbed()
    .setTitle(ticketMessage.title)
    .setDescription(ticketMessage.description)
    .setColor(BotColors.Pink)
    .setFooter('OpenTicket', 'https://cdn.discordapp.com/avatars/883190707198767194/659671effd31aac4a27370d9e5637749.webp')
    .setTimestamp();
  const ticketComponent = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('Create Ticket')
      .setLabel('Create Ticket')
      .setStyle('PRIMARY')
      .setEmoji('🎟'),
  );
  message.channel.send({ embeds: [ticketEmbed], components: [ticketComponent] });
};

module.exports.config = {
  name: 'ticket',
};
