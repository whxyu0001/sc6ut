const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "help",
  category: "Information",
  aliases: ["h"],
  description: "Get Help Menu",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {


    const lawde = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Invite")
          .setStyle("LINK")
          .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new MessageButton()
          .setLabel("Support")
          .setStyle("LINK")
          .setURL("https://discord.gg/sc6ut"),
        new MessageButton()
          .setLabel("Vote")
          .setStyle("LINK")
          .setURL(`https://top.gg/bot/${client.user.id}/vote`),
      )



    let helpmenu = new MessageEmbed()



      .setAuthor({ name: `sc6ut's Help Panel`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
      .setDescription(`**sc6ut is A Rich Discord Music Bot Supports Spotify and SoundCloud with aesthetic focused**`)
      .addFields(
        { name: `**Links**`, value: `**[Website](https://whxyu.space)\n [Support Server](https://discord.gg/sc6ut) **`, inline: false },
        { name: "Commands Category `:`", value: "\n<:s_discord:1093802675918868511> `:` **Infomation** \n <:s_vote:1093788370167136306> `:` **Miscellaneous**\n <:s_admin:1093802149592453120> `:` **Moderation**\n <:notes:1101715449311408170> `:` **Music**", inline: false },
      )
      .setFooter({ text: `• Choose A Category Below To See All Command Category | discord.gg/sc6ut`, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setColor("WHITE");


    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('help')
          .setPlaceholder('>>> Browse my commands!')
          .addOptions([
            {
              label: 'Infomation',
              description: 'Information Commands ',
              value: 'first',
              emoji: '1093802675918868511'
            },
            {
              label: 'Miscellaneous',
              description: 'Miscellaneous Commands',
              value: 'second',
              emoji: '1093788370167136306'
            },
            {
              label: 'Moderation',
              description: 'Moderation Commands',
              value: 'third',
              emoji: '1093802149592453120'
            },
            {
              label: 'Music',
              description: 'Music Commands',
              value: 'fourth',
              emoji: '1106481057156567060'
            },
            {
              label: 'Slash Commands',
              description: '0 commands at the moment',
              value: 'fifth',
              emoji: '1106931871302045756'
            },
            {
              label: 'All Commands',
              description: 'Display all sc6ut\'s command',
              value: 'sixth',
              emoji: '1093802452257615872'
            },
          ])
      )
    if (!args[0]) return message.reply({ embeds: [helpmenu], components: [row, lawde] });
    //message.reply({ embeds: [helpmenu], components: [row] })
  }
}