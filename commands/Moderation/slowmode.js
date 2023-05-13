const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    category: "Moderation",
    aliases: [ "slowmode" ],
    description: "Changes the current channel slowmode",
    args: false,
    usage: "",
    userPermissions: ['MANAGE_CHANNELS'],
    owner: false,

    async execute(message, args) {
        const slowDuration = parseInt(args[0]);
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`);
      return message.reply({ embeds: [errorEmbed] });
    }

        if (isNaN(slowDuration)) {
      const helpembed = new MessageEmbed()
               .setColor('WHITE')
        .setAuthor(`slowmode.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```slowmode```', inline: true  },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_channels```', inline: true },
                 { name: '**Usage**', value: '`Syntax: ;slowmode (seconds)`', inline: false },
)
      return message.reply({ embeds: [helpembed] });
        }

        // Set slowmode for the current channel
        await message.channel.setRateLimitPerUser(slowDuration);

        // Send success message
        const successEmbed = new MessageEmbed()
            .setColor('WHITE')
            .setDescription(`<:s_tick:1093784173426245703> <@${message.author.id}> : Slowmode set to **${slowDuration}** seconds!`);
        await message.channel.send({ embeds: [successEmbed] });
    }
};