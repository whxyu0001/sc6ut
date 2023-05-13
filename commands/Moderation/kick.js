const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'kick',
  category: 'Moderation',
  aliases: ['k'],
  description: 'Kick a user from the server.',
  usage: ';kick <user> [reason]',
  execute: async (message, args) => {
    if (!message.member.permissions.has('KICK_MEMBERS')) {
      const error = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Kick Members\` permission to use this command.`);
      return message.reply({ embeds: [error] });
    }

    if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
      const error = new MessageEmbed()
        .setColor('RED')
        .setDescription(`I do not have the \`Kick Members\` permission.`);
      return message.reply({ embeds: [error] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const helpembed = new MessageEmbed()
        .setColor('WHITE')
        .setAuthor(`kick.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```kick, k```', inline: true },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```kick_members```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;kick (user) [reason]`', inline: false },
        );
      return message.reply({ embeds: [helpembed] });
    }

    let reason = '';
    if (args.length > 1) {
      args.shift();
      reason = args.join(' ');
    }

    const embed = new MessageEmbed()
      .setTitle(`Are you sure you want to kick ${user.tag}?`)
      .setColor('WHITE');

    const acceptButton = new MessageButton()
      .setCustomId('kick_accept')
      .setEmoji('<:s_tick:1093784173426245703>')
      .setStyle('SECONDARY');

    const cancelButton = new MessageButton()
      .setCustomId('kick_cancel')
      .setEmoji('<:s_cross:1093541595334324326>')
      .setStyle('SECONDARY');

    const row = new MessageActionRow()
      .addComponents(acceptButton, cancelButton);

    const messageToDelete = await message.channel.send({
      embeds: [embed],
      components: [row],
    });

    const filter = i => {
      return i.customId === 'kick_accept' || i.customId === 'kick_cancel';
    };

    const collector = messageToDelete.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async i => {
      if (i.customId === 'kick_accept') {
        const testembed = new MessageEmbed()
          .setColor('WHITE')
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`User ${user.tag} has been kicked.`)
        await i.deferUpdate();
        await messageToDelete.edit({
          embeds: [testembed],
          components: [],
        });
        collector.stop();

        // Perform the kick here
        message.guild.members.kick(user, { reason: reason || 'No reason provided' });
      } else if (i.customId === 'kick_cancel') {
        const cancelembed = new MessageEmbed()
          .setColor('WHITE')
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription('The kick has been cancelled.')
        await i.deferUpdate();
        await messageToDelete.edit({
          embeds: [cancelembed],
          components: [],
        });
        collector.stop();
      }
    });

    collector.on('end', () => {
      if (!messageToDelete.deleted && messageToDelete.editable) {
        messageToDelete.edit({ components: [] });
      }
    });
  },
};