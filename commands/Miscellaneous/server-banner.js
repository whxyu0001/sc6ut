const { Message, Client, MessageEmbed } = require("discord.js");
module.exports = {
  name: "server-banner",
    category: "Utility",
    description: "View a server's banner",
    aliases: [ "sbanner" ],
    args: false,
    usage: "",
    permission: [],
    voteonly: false,
    owner: false,
    execute: async (message, args, client, prefix) => {



   if(message.guild.banner) {
        let embed = new MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setTitle("**${message.guild.name}'s Banner**'")
          .setColor(`WHITE`)
          .setImage(message.guild.bannerURL({size: 4096}))
        message.reply({embeds: [embed]})
      } else {
        let embed = new MessageEmbed()
          .setDescription(`<:s_warn:109378953373419523> <@${message.author.id}: **${message.guild.name}** doesn't have a **server banner**`)
          .setColor(`WHITE`)
          
          
        message.reply({embeds: [embed]})
      }
  }
}