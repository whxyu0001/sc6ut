const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "banner",
  category: "Utility",
  description: "View a user's banner",
  aliases: ["bn"],
  args: false,
  usage: "",
  permission: [],
  voteonly: false,
  owner: false,
  execute: async (message, args, client, prefix) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

    const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`
      }
    }).then(d => d.data);

    const bannerURL = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}.png?size=4096`

    if (data.banner) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Download')
            .setURL(bannerURL)
            .setStyle('LINK')
        )

      const embed = new MessageEmbed()
        .setColor(`WHITE`)
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`${user}\'s banner`)  
        .setImage(bannerURL)

      message.channel.send({ embeds: [embed], components: [row] })
    } else {
      message.channel.send({
        embeds: [new MessageEmbed()
          .setDescription(`<:s_warn:109378953373419523> <@${message.author.id}>: **${user}** doesn't have a **banner**`)
          .setColor(`WHITE`)
        ]
      })
    }
  }
}