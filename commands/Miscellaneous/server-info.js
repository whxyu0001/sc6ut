const { MessageEmbed } = require("discord.js");
const moment = require("moment")
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Very High"
}
const booster = {
  NONE: 'Level 0',
  TIER_1: 'Level: 1',
  TIER_2: 'Level: 2',
  TIER_3: 'Level: 3'
}
const disabled = '<:s_cross:1093541595334324326>'
const enabled = '<:s_tick:1093784173426245703>'

module.exports = {
    name: "server-info",
    category: "Utility",
    description: "View a server's Information",
    aliases: [ "sinfo" ],
    args: false,
    usage: "",
    permission: [],
    voteonly: false,
    owner: false,
    execute: async (message, args, client, prefix) => {
      this.client = client;
      const guild = message.guild;
      const { createdTimestamp, ownerId , description} = guild;
      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
              return days + (days == 1 ? " day" : " days") + " ago";
      };
      const roles = guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)
      let rolesdisplay;
      if (roles.length < 15) {
        rolesdisplay = roles.join(' ')
        if (roles.length < 1) rolesdisplay = "None"
      } else {
        rolesdisplay = `\`Too many roles to show..\``
      }
      if(rolesdisplay.length > 1024)
        rolesdisplay = `${roles.slice(4).join(" ")} \`more..\``
      const members = guild.members.cache
      const channels = guild.channels.cache
      const emojis = guild.emojis.cache
      let data = guild.bannerURL
      if(data){
        return message.reply({embeds: [new MessageEmbed()
          .setColor(this.client.color)
          .setTitle(`${guild.name}'s Information`)
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setImage(guild.bannerURL({size: 4096}))
          .addFields([
            {
              name: '__About__',
              value: `**Name**: ${guild.name} \n **ID**: ${guild.id} \n **Owner <:s_owner:1093789039615815760>:** <@!${guild.ownerId}> (${guild.ownerId})\n**Created at:** <t:${parseInt(createdTimestamp / 1000)}:R>\n**Members: **${guild.memberCount}`
            },
            {
              name: '__Server Information__',
              value: `**Verification Level:** ${verificationLevels[guild.verificationLevel]}\n**Inactive Channel: **${guild.afkChannelId ? `<#${guild.afkChannelId}>` : `${disabled}`}\n**Inactive Timeout: **${guild.afkTimeout/60} mins\n**System Messages Channel: **${guild.systemChannelId ? `<#${guild.systemChannelId}>` : disabled}\n**Boost Bar Enabled: **${guild.premiumProgressBarEnabled ? enabled : disabled}`
            },
            {
              name: '__Channels__',
              value: `**Total: ** ${channels.size}\n**Channels: **<:s_channel:1093808599010119700> ${channels.filter(channel => channel.type === 'GUILD_TEXT').size} | <:s_stage:1093808722570125362> ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`
            },
            {
              name: '__Emoji Info__',
              value: `**Regurlar:** ${emojis.filter(emoji => !emoji.animated).size} \n**Animated:** ${emojis.filter(emoji => emoji.animated).size} \n**Total:** ${emojis.size}`
            },
            {
              name: '__Boost Status__',
              value: `${booster[guild.premiumTier]} [<:s_boosts:1093808855311458355> ${guild.premiumSubscriptionCount || '0'} Boosts]`
            },
            {
              name: `__Server Roles__ [${roles.length}]`,
              value: `${rolesdisplay}`
            }
          ])
          .setTimestamp()
        ]})
      }
  }
};