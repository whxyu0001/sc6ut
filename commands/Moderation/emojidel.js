const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'delemoji',
  category: 'Admin',
  description: 'Delete a custom emoji from the server by its name or ID.',
  usage: ';delemoji <emoji>',
  execute: async (message, args) => {

    if (!message.member.permissions.has('MANAGE_EMOJIS')) {
      return message.reply(`You must have \`Manage Emojis\` permissions to use this command.`);
    }

    const emoji = args[0];
    if (!emoji) {
      const helpEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setAuthor(`delemoji.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Category**', value: '```Admin```', inline: true },
          { name: '**Permissions**', value: '```manage_emojis```', inline: true },
          { name: '**Description**', value: '`Remove an emoji by name or ID.`', inline: false },
          { name: '**Usage**', value: '`Syntax: ;delemoji <emoji>`', inline: false },
        );
      return message.reply({ embeds: [helpEmbed] });
    }

    // Get the emoji by name or ID
    const emojiToDelete = message.guild.emojis.cache.find(e => e.name === emoji || e.id === emoji);

    // Check if the emoji exists
    if (!emojiToDelete) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | Huh, I couldn't find an emoji with ID of ${emojiID}`)] });
    }

    // Delete the emoji and notify the user
    await emojiToDelete.delete(`Deleted by ${message.author.tag}`);
          return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_tick:1093784173426245703> | The emoji with ID ${emojiID} has been successfully deleted.`)] });
  },
};