const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
   name: `list`,
  category: `Moderation`,
  aliases: [`list`],
  permission: [],
  voteonly: false,
  owner: false,
  description: `shows list of admin,bot,inrole`,
  usage: `list`,
  execute: async (message, args, client, prefix) => {
    if(!args[0]){
            const helpembed = new MessageEmbed()
        .setColor('WHITE')
        .setAuthor(`list.js`, message.author.displayAvatarURL())
        .addFields(
          { name: '**Aliases**', value: '```list```', inline: true },
          { name: '**Category**', value: '```Moderation```', inline: true },
          { name: '**Permissions**', value: '```administrator```', inline: true },
          { name: '**Usage**', value: '`Syntax: ;list <admin/bot/inrole + role>`', inline: false },
        )
      return message.reply({ embeds: [helpembed] });
    }
    const require = args[0].toLowerCase();
    if (require  === "admin" || require == 'admins' || require == 'administration') {
      const administrators = message.guild.members.cache.filter((member) =>
 member.permissions.has('ADMINISTRATOR')
);
      const embed = new MessageEmbed()
      .setTitle("List For Admin In This Server")
      .setDescription(`${administrators.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if (require === "bot" || require == 'bots') {
      const bot = message.guild.members.cache.filter((member) => member.user.bot)
      if(!bot) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | I guess there is no bots in this server.`)]});
      const embed = new MessageEmbed()
      .setTitle("List Of Bots In This Server")
      .setDescription(`${bot.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if (require === "inrole" || require == 'role') {
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || await message.guild.roles.fetch(args[1]);
      if(!role) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | No roles found.`)]});
      const embed = new MessageEmbed()
      .setTitle(`Members Having ${role.name}:`)
      .setDescription(`${role.members.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if(require == 'ban' || require == 'bans'){
      let bans = await message.guild.bans.fetch();
      let ban = bans.map(us => `[${us.user.username}](https://discord.com/users/${us.user.id}) | ${us.user.id}`);
      if(!ban[0]){
        return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`There are no users banned`)]})
      }
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription('**' + ban.join('\n') + '**').setTitle(`List Of Ban Members In ${message.guild.name}`)]});
    }

    else{
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't provided the list type.\nList Options: \`admin\`,\`bot\`, \`inrole\``)]})
    }
  }
}