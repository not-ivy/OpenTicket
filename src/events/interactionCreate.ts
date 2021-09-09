import { Interaction, MessageActionRow, MessageButton } from 'discord.js';
import * as fs from "fs";
import { getDatabase, increaseTicketCounter } from '../database';
import { embedSuccess } from '../util';
import { config } from '../main';

module.exports = {
  name: 'interactionCreate',
  execute(interaction: Interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'Create Ticket') {
      increaseTicketCounter();
      const lockButton = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('Close Ticket')
          .setLabel('Close Ticket')
          .setStyle('PRIMARY')
          .setEmoji('🔒'),
      );
      interaction.guild?.channels.create(`ticket-${getDatabase().ticketCount}`)
        .then(async (channel) => {
          channel.send(`||${interaction.user} ${config.notifyRoles.map((id) => `<@&${id}>`).join(' ')}||`);
          channel.send({
            embeds: [
              embedSuccess(`Ticket created by ${interaction.user.username}#${interaction.user.discriminator}`, 'To close this ticket, react to the interaction.'),
            ],
            components: [
              lockButton,
            ],
          });
        });
    } else if (interaction.customId === 'Close Ticket') {
      const messageArray:string[] = [];
      interaction.channel?.messages.cache.forEach((message) => {
        messageArray.push(`[${message.createdAt.toUTCString()}]<${message.author.username}#${message.author.discriminator}> ${message.content}`);
      });
      fs.writeFileSync(`${interaction.channel?.id}.txt`, messageArray.join('\n'));
      interaction.channel?.delete();
    }
  },
};
