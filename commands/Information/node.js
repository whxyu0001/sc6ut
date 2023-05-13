const { MessageEmbed } = require("discord.js");
const i18n = require("../../utils/i18n");

module.exports = {
  name: i18n.__("cmd.node.name"),
  category: "Information",
  description: i18n.__("cmd.node.des"),
  args: false,
  usage: "",
  permission: [],
  owner: true,
  execute: async (message, args, client, prefix) => {
    const all = client.manager.nodes
      .map(
        (node) => ` 
NODE ID    ::  NODE - 1
NODE STATE ::  CONNECTED
PLAYERS    ::  1
UPTIME     ::  ${new Date(node.stats.uptime)
            .toISOString()
            .slice(11, 19)}
MEMORY     ::  ${Math.round(
            node.stats.memory.reservable / 1024 / 1024
          )}mb
CORES      ::  ${node.stats.cpu.cores}
        `
           ) 
            
      
      .join("\n\n----------------------------\n");

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Atomic Node",
        iconURL: client.user.displayAvatarURL(),
      })
      .setDescription(`\`\`\`${all}\`\`\``)
      .setColor(client.embedColor);
    message.reply({ embeds: [embed] });
  },
};
