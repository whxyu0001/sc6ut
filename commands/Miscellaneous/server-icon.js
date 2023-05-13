const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "servericon",
    category: "Utility",
    description: "Displays the server's icon",
    aliases: [ "sicon" ],
    args: false,
    usage: "",
    permission: [],
    voteonly: false,
    owner: false,
    execute: async (message, args, client, prefix) => {
        const iconURL = message.guild.iconURL({ dynamic: true, size: 2048 });
        if (!iconURL) {
            const errorEmbed = new MessageEmbed()
           .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`<:s_warn:109378953373419523> <@${message.author.id}: **${message.guild.name}** doesn't have a **server icon**`)
          .setColor(`WHITE`)
            return message.reply({ embeds: [errorEmbed] });
        }
    
        const iconEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("WHITE")
            .setDescription(`Server icon for ${message.guild.name}`)
            .setImage(iconURL);
      
        message.channel.send({ embeds: [iconEmbed] });
    }
};