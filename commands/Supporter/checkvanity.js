const { MessageEmbed } = require("discord.js");
const Discord  = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "checkvanity",
    category: "Utility",
    description: "Check a vanity wether is it avalible",
    aliases: [ "checkvanity" ],
    args: false,
    usage: "vanity <vanityname>",
    permission: [],
    voteonly: false,
    owner: false,
    execute: async (message, args, client, prefix) => {
        if (!args.length) {
      const helpembed = new MessageEmbed()
               .setColor('WHITE')
        .setAuthor(`checkvanity.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```checkvanity```', inline: true  },
          { name: '**Category**', value: '```Utility```', inline: true },
          { name: '**Permissions**', value: '```none```', inline: true },
           { name: '**Usage**', value: '`Syntax: ;checkvanity (vanity)`', inline: false },
)
      return message.reply({ embeds: [helpembed] });
        }
        const vanityUrl = args[0];
        const apiUrl = `http://discord.com/api/v9/invites/${vanityUrl}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.message === 'Unknown Invite') {
                const availableEmbed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`<:s_tick:1093784173426245703> ${message.author.toString()}: Vanity **${vanityUrl}** is **available**`);
              message.channel.send({ embeds: [availableEmbed] });
            } else {
                const takenEmbed = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`<:s_cross:1093541595334324326> ${message.author.toString()}: Vanity **${vanityUrl}** is **unavailable**`);
              message.channel.send({ embeds: [takenEmbed] });
            }
        } catch (error) {
            console.error(error);
            const errembed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setDescription(`<:s_warn:1093789533734195230> ${message.author.toString()}: There was an error checking the vanity`);
          message.channel.send({ embeds: [errembed] });
        }
    }
}
