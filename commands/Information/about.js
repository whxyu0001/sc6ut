const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "about",
  category: "Information",
  aliases: ["ab", "abt"],
  description: "binfo",
  args: false,
  usage: "",
  permission: ["SEND_MESSAGES"],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let days = Math.floor(client.uptime / 86400000);

    let hours = Math.floor(client.uptime / 3600000) % 24;

    let minutes = Math.floor(client.uptime / 60000) % 60;


    let uptime = `${days}:${hours}:${minutes}`;
    const commands = require("../../index");
console.log(`Number of commands: ${commands.size}`);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription("**sc6ut** is an open-source multipurpose Discord bot with high-quality music and some extraordinary features.")
      .addFields(
        { name: '**Stats**', value: `**Users** : ${message.client.users.cache.size}\n**Guilds** : ${message.client.guilds.cache.size}`, inline: true },
        { name: '**Client**', value: `**Ping** : ${client.ws.ping}ms \n **Uptime** : ${uptime}`, inline: true },
        { name: '**Bot**', value: `**Commands** :  ${commands.size}`, inline: true },
      )

      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())





    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Invite")
          .setStyle("LINK")
          .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new MessageButton()
          .setLabel("Support server")
          .setStyle("LINK")
          .setURL("https://discord.gg/sc6ut"),
        new MessageButton()
          .setLabel("Vote")
          .setStyle("LINK")
          .setURL(`https://top.gg/bot/${client.user.id}/vote`),
      )





    return message.reply({ embeds: [embed], components: [row] })


  }
}