const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: `unlock`,
  category: `Moderation`,
  aliases: [`unlock`, 'unlk'],
  description: `unlock a channel`,
  usage: `unlock <channel>`,
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`);
      return message.reply({ embeds: [errorEmbed] });
    }

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    if (channel.manageable) {
      channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true,
        reason: `${message.author.tag} (${message.author.id})`
      })
      const emb = new MessageEmbed()
        .setDescription(`<:s_tick:1093784173426245703> <@${message.author.id}>: ${channel} has been **unlocked** for @everyone role`)
        .setColor('WHITE')
      return message.reply({ embeds: [emb] })
    }
    else {
      const embi = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_warn:1093789533734195230> <@${message.author.id}>: I dont have enough permissions to unlock this channel.`)
        .setColor('WHITE')
      return message.reply({ embeds: [embi] })
    }
  }
}