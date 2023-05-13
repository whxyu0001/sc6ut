const MusicBot = require("./structures/MusicClient");
const Topgg = require("@top-gg/sdk")

const client = new MusicBot();
client.topgg = new Topgg.Api(process.env.topgg)
client.connect()
const server1337 = require('./server.js');

const { MessageEmbed } = require('discord.js')
server1337();
client.emoji = {
  'tick': '<:s_tick:1093784173426245703>',
  'cross': '<:s_cross:1093541595334324326>',
  'dot': '<a:s_dot:1093784644740194304> ',
  'giveaway': '<:s_giveaway:1093786091837993021>'
};


client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;

  let options = interaction.values;
  const funny = options[0]

  if (funny === 'first') {
    const embed1 = new MessageEmbed()
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("<:tree1:1106478449142546493>about.js\n<:tree1:1106478449142546493>invite.js\n <:tree1:1106478449142546493>ping.js\n<:tree1:1106478449142546493>node.js\n<:tree1:1106478449142546493>stats\n<:tree1:1106478449142546493>uptime.js\n<:tree1:1106478449142546493>about.js\n<:tree2:1106478520064016394>vote.js")
      .setTitle("<:s_discord:1093802675918868511> | Information Commands")
      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")
    interaction.reply({ embeds: [embed1], ephemeral: true })
    return
  }

  if (funny === 'second') {
    const embed4 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("<:tree1:1106478449142546493>avatar.js\n<:tree1:1106478449142546493>banner.js\n <:tree1:1106478449142546493>calculator.js\n<:tree1:1106478449142546493>emojilist.js\n<:tree1:1106478449142546493>firstmessage.js\n<:tree1:1106478449142546493>list-roles.js\n<:tree1:1106478449142546493>membercount.js\n<:tree1:1106478449142546493>server-banner.js\n<:tree1:1106478449142546493>server-icon.js\n<:tree1:1106478449142546493>checkvanity.js\n<:tree2:1106478520064016394>server-info.js")
      .setTitle("<:s_vote:1093788370167136306> | Miscellaneous Commands")

      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")

    interaction.reply({ embeds: [embed4], ephemeral: true })
    return
  }
  if (funny === 'fourth') {
    const embed3 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("<:tree1:1106478449142546493>247.js\n<:tree1:1106478449142546493>autoplay.js\n<:tree1:1106478449142546493>clearqueue.js\n <:tree1:1106478449142546493>destroy.js\n<:tree1:1106478449142546493>join.js\n<:tree1:1106478449142546493>leave\n<:tree1:1106478449142546493>loop.js\n<:tree1:1106478449142546493>nowplaying.js\n<:tree1:1106478449142546493>pause.js\n<:tree1:1106478449142546493>play.js\n<:tree1:1106478449142546493>queue.js\n<:tree1:1106478449142546493>remuse.js\n<:tree1:1106478449142546493>shuffle.js\n<:tree1:1106478449142546493>skip.js\n<:tree1:1106478449142546493>stop.js\n<:tree1:1106478449142546493>filters.js\n<:tree2:1106478520064016394>volume.js")
      .setTitle("<:music:1106481057156567060> | Music Commands")
      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")


    interaction.reply({ embeds: [embed3], ephemeral: true })
    return
  }
  if (funny === 'third') {
    const embed2 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("<:tree1:1106478449142546493>ban.js\n<:tree1:1106478449142546493>hide.js\n<:tree1:1106478449142546493>kick.js\n<:tree1:1106478449142546493>list.js\n<:tree1:1106478449142546493>lock.js\n<:tree1:1106478449142546493>nuke.js\n<:tree1:1106478449142546493>prefix.js\n<:tree1:1106478449142546493>purge.js\n<:tree1:1106478449142546493>rolecreate.js\n<:tree1:1106478449142546493>slowmode.js\n<:tree1:1106478449142546493>unhide.js\n<:tree2:1106478520064016394>unlock.js")
      .setTitle("<:s_admin:1093802149592453120> | Moderation Commands")

      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")

    interaction.reply({ embeds: [embed2], ephemeral: true })
    return
  }


  if (funny === 'fifth') {
    const embed5 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("**Sorry,im too lazy to add slash commands lol**")
      .setTitle("<:s_spaceship:1093803278103490591> | Slash Commands")
      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")
    interaction.reply({ embeds: [embed5], ephemeral: true })
    return
  }

  if (funny === 'sixth') {
    const embed6 = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .addField("Information Commands [ 10 ]", "`about, help, invite, invites, node, ping, profile, status, uptime, vote")

      .addField("Miscellaneous Commands [ 10 ]", "`avatar, banner, calculator, emojilist, fistmsg, list-roles, membercount, server-banner, server-icon, server-info`")
      .addField("Moderation Commands [ 11 ]", "`ban, hide, kick, list, lock, nuke, purge, rolecreate, slowmode, unhide, unlock``")
      .addField("Music Commands [ 16 ] ", "`autoplay, clearqueue, join, leave, loop, nowplaying, pause, play, volume, destroy, queue, resume, shuffle, skip, stop, filters`")

      .addField("Settings [ 1 ]", "setprefix`")

      .addField("Supporter Commands [ 3 ] ", "`selfpurge, checkvanity, 247, sourcecode`")


      .setAuthor("| All Commands:")
      .setColor(client.embedColor)
      .setFooter("discord.gg/sc6ut")
    interaction.reply({ embeds: [embed6], ephemeral: true })
    return
  }



})
