const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: `hide`,
  category: `Moderation`,
  aliases: [`hide`, `h`],
  description: `Hide a channel.`,
  usage: `hide [channel]`,
  async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`);
      return message.reply({ embeds: [errorEmbed] });
    }
    const user = message.mentions.users.first();
    if (!user) {
      const helpembed = new MessageEmbed()
       .setColor('WHITE')
        .setAuthor(`hide.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```hide, h```', inline: true  },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_channels```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;hide [channel]`', inline: false },
        )
      return message.reply({ embeds: [helpembed] });
    }
    const channel = message.mentions.channels.first()  || message.guild.channels.cache.get(args[0])  ||  message.channel;
    if(channel.manageable){
    channel.permissionOverwrites.edit(message.guild.id, {
      VIEW_CHANNEL: false,
      reason: `${message.author.tag} (${message.author.id})`
    })
    const emb = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_tick:1093784173426245703> <@${message.author.id}>: ${channel} has been **hidden** for @everyone role`)
        .setColor('WHITE')
      return message.channel.send({embeds: [emb]})
    } 
  else {
      const embi = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_warn:1093789533734195230> <@${message.author.id}>: I dont have enough permissions to hide this channel.`)
        .setColor('WHITE')
      return message.channel.send({embeds: [embi]})
    }
  }
}