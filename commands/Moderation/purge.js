const { MessageEmbed } = require('discord.js');
module.exports = {
  name: `purge`,
  category: `Moderation`,
  aliases: [`purge`, 'c'],
  permission: [],
  voteonly: false,
  owner: false,
  description: `purge messages`,
  usage: `purge`,
  execute: async (message, args, client, prefix) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You must have \`Manage Messages\` permissions to use this command.`)] })
    }
    else {
      const amount = args[0];
      if (!amount) {
      const helpembed = new MessageEmbed()
       .setColor('WHITE')
        .setAuthor(`purge.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```purge, c```', inline: true  },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_messages```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;purge (amount)`', inline: false },
        )
       message.reply({ embeds: [helpembed] });
      }
      else {
        if (!parseInt(amount)) {
          message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You must provide a valid number of messages to be purged.`)] })
        } else if (amount >= 1000) {
          message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You can't purged more than **999** messages at a time.`)] })
        } else {
          await message.delete().catch((_) => { });
          Delete(message.channel, amount);
          message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_tick:1093784173426245703> | Successfully purged ${amount} messages.`)] })
        }
      }
    }
  }
}

function Delete(channel, amount) {
  for (let i = amount; i > 0; i -= 100) {
    if (i > 100) {
      channel.bulkDelete(100).catch((_) => { });
    } else {
      channel.bulkDelete(i).catch((_) => { });
    }
  }
}