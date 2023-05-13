const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'unhide',
  category: 'Moderation',
  aliases: ['uh'],
  description: 'Unhide a channel.',
  usage: ';unhide [channel]',
  execute: async (message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`);
      return message.reply({ embeds: [errorEmbed] });
    }

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

    if (!channel.manageable) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`I cannot unhide the ${channel} channel as I do not have the required permissions.`);
      return message.reply({ embeds: [errorEmbed] });
    }

    channel.permissionOverwrites.edit(message.guild.id, {
      VIEW_CHANNEL: true,
      reason: `${message.author.tag} (${message.author.id}) has unhidden the channel`
    });

    const embed = new MessageEmbed()
      .setColor('WHITE')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`<:s_tick:1093784173426245703> <@${message.author.id}>: ${channel} has been **shown** for @everyone role.`);

    message.channel.send({ embeds: [embed] });
  },
};