const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  name: "invites",
  category: "Information",
  description: "Show the number of invites that a member has created",
  execute: async (message, args, client) => {
    const user = message.mentions.users.first() || message.author;

    try {
      const guildInvites = await message.guild.invites.fetch();
      const memberInvites = guildInvites.filter((invite) => {
  if (invite.inviter.id === user.id && invite.uses > 0) {
    return true;
  } else {
    return false;
  }
});

      let inviteCount = 0;
      memberInvites.forEach((invite) => (inviteCount += invite.uses));

      const juice = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`<:s_tick:1093784173426245703> ${message.author} : Number of invites : **${inviteCount}**`);

      message.channel.send({ embeds: [juice] });

    } catch (error) {
      console.error(error);
      message.channel.send("An error occurred while fetching the invites.");
    }
  },
};
