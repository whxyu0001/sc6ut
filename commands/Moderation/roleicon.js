const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'roleicon',
  description: 'Edits the icon of a role to the provided icon or removes it if no icon is provided.',
  category: 'Moderation',
  usage: '<role name or mention> <icon URL or "remove">',
  execute: async (message, args) => {
    if (!message.member.permissions.has('MANAGE_ROLES')) {
      message.reply({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | You must have \`Manage Roles\` permissions to use this command.`)] })
    }

    const roleName = args[0];
    const roleIcon = args[1];

    // Get the role object from the guild
    const role = message.guild.roles.cache.find((r) => r.name === roleName || r.id === roleName.replace(/[^\w-]+/g, ''));

    // If role is not found, send error message
    if (!role) return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | Huh, I didn't found ${roleName} .`)] });

    // If user wants to remove the icon
    if (roleIcon.toLowerCase() === 'remove') {
      await role.setIcon(null);
      return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_tick:1093784173426245703> | Removed Role Icon for  ${roleName} .`)] });
    }

    // If role icon URL is not valid, send error message
    if (!/^https?:\/\/[^\s/$.?#]+.[^\s]*$/i.test(roleIcon)) {
      return message.channel.send({ embeds: [new MessageEmbed().setColor('WHITE').setDescription(`<:s_cross:1093541595334324326> | Please provide vaild icon url`)] });
    }

    // Edit the role icon
    await role.setIcon(roleIcon);

    // Create the Embed
    const embed = new MessageEmbed()
      .setColor(role.hexColor)
      .setTitle(`${role.name} Icon:`)
      .setImage(role.iconURL());

    // Send the Embed
    message.channel.send({ embeds: [embed] });
  }
};