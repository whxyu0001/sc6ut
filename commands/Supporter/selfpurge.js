module.exports = {
  name: `selfpurge`,
  category: `Supporter`,
  aliases: [`selfpurge`, 'sc'],
  permission: [],
  voteonly: true,
  owner: false,
  description: `selfpurge your messages`,
  usage: `selfpurge`,
  execute: async (message, args, client, prefix) => {

      const amount = args[0];
      if (!amount) {
        const helpembed = new MessageEmbed()
          .setColor('WHITE')
          .setAuthor(`selfpurge.js`, message.author.displayAvatarURL())
          .addFields(
            { name: '**Aliases**', value: '```selfpurge, sc```', inline: true },
            { name: '**Category**', value: '```Moderation```', inline: true },
            { name: '**Permissions**', value: '```none```', inline: true },
            { name: '**Usage**', value: '`Syntax: ;selfpurge (amount)`', inline: false },
          )
        message.reply({ embeds: [helpembed] });
      }

      const numToDelete = args[0];
      // Get an array of the messages to be deleted
      const messagesToDelete = message.channel.messages.cache.array().filter(m => m.author.id === message.author.id).slice(0, numToDelete);

      try {
        // Delete the messages
        await message.channel.bulkDelete(messagesToDelete, true);
        // Send a confirmation message
        const embed = new MessageEmbed()
          .setColor("WHITE")
          .setDescription(`<:s_tick:1093784173426245703> | Successfully purged ${messagesToDelete.length} messages.`)
        message.channel.send({embeds: [embed]}).then(msg => {
          setTimeout(() => msg.delete(), 5000);
        });
      } catch (error) {
        console.error(error);
        const embed = new MessageEmbed()
          .setColor("#WHITE")
          .setDescription('There was an error deleting the messages,please contact comet </>#0001 for support')
        message.channel.send({embeds: [embed]}).then(msg => {
          setTimeout(() => msg.delete(), 5000);
        });
      }
    } // Add this closing curly brace

};
