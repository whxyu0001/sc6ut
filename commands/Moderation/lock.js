const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: `lock`,
  category: `Moderation`,
  aliases: [`lock`, 'lk'],
  description: `Lock a channel`,
  usage: `lock <channel>`,
  async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      let error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`)
      return message.reply({ embeds: [error] });
      }
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const helpembed = new MessageEmbed()
        .setColor('WHITE')
        .setAuthor(`lock.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```lock, lk```', inline: true },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_channels```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;lock <channel>`', inline: false },
        )
      return message.reply({ embeds: [helpembed] });
    }
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    if (channel.manageable) {
      channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false,
        reason: `${message.author.tag} (${message.author.id})`
      })
      const emb = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_tick:1093784173426245703> <@${message.author.id}>: ${channel} has been **locked** for @everyone role`)
        .setColor('WHITE')
      return message.channel.send({ embeds: [emb] })
    }
    else {
      const embi = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_warn:1093789533734195230> <@${message.author.id}>: I dont have enough permissions to lock this channel.`)
        .setColor('WHITE')
      return message.channel.send({ embeds: [embi] })
    }
  }
}