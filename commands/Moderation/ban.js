const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'ban',
  category: 'Moderation',
  aliases: ['b'],
  description: 'Ban a user from the server.',
  usage: ';ban <user> [reason]',
  execute: async (message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      const error = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Ban Members\` permission to use this command.`);
      return message.reply({ embeds: [error] });
    }

    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      const error = new MessageEmbed()
        .setColor('RED')
        .setDescription(`I do not have the \`Ban Members\` permission.`);
      return message.reply({ embeds: [error] });
    }

    const user = message.mentions.users.first();
    if (!user) {
      const helpembed = new MessageEmbed()
        .setColor('WHITE')
        .setAuthor(`ban.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```ban, b```', inline: true },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```ban_members```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;ban (user) [reason]`', inline: false },
        );
      return message.reply({ embeds: [helpembed] });
    }

    let reason = '';
    if (args.length > 1) {
      args.shift();
      reason = args.join(' ');
    }

    const embed = new MessageEmbed()
      .setTitle(`Are you sure you want to ban ${user.tag}?`)
      .setColor('WHITE');

    const acceptButton = new MessageButton()
      .setCustomId('ban_accept')
      .setEmoji('<:s_tick:1093784173426245703>')
      .setStyle('SECONDARY');

    const cancelButton = new MessageButton()
      .setCustomId('ban_cancel')
      .setEmoji('<:s_cross:1093541595334324326>')
      .setStyle('SECONDARY');

    const row = new MessageActionRow()
      .addComponents(acceptButton, cancelButton);

    const messageToDelete = await message.channel.send({
      embeds: [embed],
      components: [row],
    });

    const filter = i => {
      return i.customId === 'ban_accept' || i.customId === 'ban_cancel';
    };

    const collector = messageToDelete.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async i => {
      if (i.customId === 'ban_accept') {
        const testembed = new MessageEmbed()
          .setColor('WHITE')
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`User ${user.tag} has been banned.`)
        await i.deferUpdate();
        await messageToDelete.edit({
          embeds: [testembed],
          components: [],
        });
        collector.stop();

        // Perform the ban here
        message.guild.members.ban(user, { reason: reason || 'No reason provided' });
      } else if (i.customId === 'ban_cancel') {
        const cancelembed = new MessageEmbed()
          .setColor('WHITE')
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription('The ban has been cancelled.')
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