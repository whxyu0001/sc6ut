const { MessageEmbed } = require("discord.js");
const Discord  = require("discord.js");
module.exports = {
    name: "sourcecode",
    category: "Utility",
    description: "See sc6ut's github sourcecode",
    aliases: [ "sourcecode" ],
    args: false,
    usage: "sourcecode",
    permission: [],
    voteonly: false,
    owner: false,
  execute(message, args) {
        const source = new MessageEmbed()
               .setColor('WHITE')
    .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`[**adi6n's source code**](https://github.com/adi6n/sc6ut)`)
       message.channel.send({ embeds: [source] });
  },
};