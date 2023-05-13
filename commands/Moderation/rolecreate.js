const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: `rolecreate`,
  category: `Moderation`,
  aliases: [`rc`],
  permission: [],
  voteonly: false,
  owner: false,
  description: `Create a role`,
  usage: `rolecreate <rolename>`,
execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You must have \`Manage Roles\` permissions to use this command.`)] })
    }
    if (!args[0]) {
      const helpembed = new MessageEmbed()
               .setColor('WHITE')
        .setAuthor(`rolecreate.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```rolecreate, rc```', inline: true  },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_roles```', inline: true },
                 { name: '**Usage**', value: '`Syntax: ;createrole (role name)`', inline: false },
)
      return message.reply({ embeds: [helpembed] });
    }
    const roleName = args.join(' ');
    const guild = message.guild;
    guild.roles
      .create({ name: roleName })
      .then(role => {
        const successEmbed = new MessageEmbed()
          .setColor('WHITE')
          .setDescription(`${message.author} created the role **${role.name}**!`);
        return message.channel.send({ embeds: [successEmbed] });
      })
      .catch(console.error);
  },
};