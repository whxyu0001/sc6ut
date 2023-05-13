const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: `nuke`,
  category: `Moderation`,
  aliases: [`nuke`],
  permission: [],
  voteonly: false,
  owner: false,
  description: `nuke a channel`,
  usage: `nuke`,
  execute: async (message, args, client, prefix) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      let error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`You must have \`Manage Channels\` permission to use this command.`)
      return message.reply({ embeds: [error] });
    }
    try {
      let row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("YES").setStyle("SUCCESS").setEmoji("<:s_tick:1093784173426245703>"),
        new MessageButton().setCustomId("NO").setStyle("DANGER").setEmoji("<:s_cross:1093541595334324326>")
      );
      const embed = new MessageEmbed()
        .setColor('WHITE')
        .setDescription(`Please confirm that you want to nuke this channel`)
      let msg = await message.reply({ embeds: [embed], components: [row] });
      const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply({
          content: `Only ${message.author.username} Can Use These Buttons`,
          ephemeral: true,
        });
      };
      const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
      });

      collector.on("collect", (buttonInteraction) => {
        const id = buttonInteraction.customId;
        if (id === "YES") {
          message.channel.clone().then((ch) => {
            let reason = args.join(" ") || "No Reason";
            let embed = new MessageEmbed().setDescription(`**Channel Nuked by ${message.author.username}**`).setAuthor(message.author.username, message.author.avatarURL()).setColor(client.color);
            ch.setParent(message.channel.parent);
            ch.setPosition(message.channel.position);
            message.channel.delete().then(() => {
              ch.send({ embeds: [embed] }).then((msg) => {
                setTimeout(() => msg.delete(), 5000);
              });
            });
          });
        }
        if (id === "NO") {
          msg.delete().catch((e) => { })
        }
      })
    } catch (err) {
      return message.channel.send({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`I was unable to nuke this channel.`)] })
    }
  }
}