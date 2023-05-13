const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  name: `roledelete`,
  category: `Moderation`,
  aliases: [`rc`],
  permission: [],
  voteonly: false,
  owner: false,
  description: `Delete a role`,
  usage: `roledelete <rolename>`,
execute(message, args) {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You must have \`Manage Roles\` permissions to use this command.`)] })
    }
    if (!args[0]) {
      const helpembed = new MessageEmbed()
               .setColor('WHITE')
        .setAuthor(`roledelete.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```roledelete, rd```', inline: true  },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```manage_roles```', inline: true },
                 { name: '**Usage**', value: '`Syntax: ;roledelete (role)`', inline: false },
)
      return message.reply({ embeds: [helpembed] });
    }
     const roleName = args.join(' ');
    //Get the role object from the guild
    const role = message.guild.roles.cache.find((r) => r.name === roleName || r.id === roleName.replace(/[^\w-]+/g, ''));
    //If role is not found, send error message
    if (!role) {
      return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | Huh, I didn't found ${roleName} .`)] });
    }
    role.delete()
      .then(() => {
  const successEmbed = new MessageEmbed()
          .setColor('WHITE')
          .setDescription(`${message.author} deleted role **${role.name}**!`);
        return message.channel.send({ embeds: [successEmbed] });
      })
      .catch(error => {
        console.error(error);
         const errembed = new MessageEmbed()
          .setColor('WHITE')
          .setDescription(`Could not delete role "${role.name}`);
        return message.channel.send({ embeds: [errembed] })
      });
  }
};