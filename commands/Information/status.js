const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    category: "Information",
    aliases: [ "stats" ],
    description: "Show status bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const duration1 = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        const about = message.client.emoji.about;
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
      let fck = client.ws.ping
        const embed = new MessageEmbed()
          .setAuthor("sc6ut hosting info", "https://cdn.discordapp.com/attachments/1106148412350545991/1106565978986389597/hoodie.png")
            .setColor(client.embedColor)
            
            .setDescription(`\`\`\`
  
Servers        :: ${scount}
Channels       :: ${ccount}
Users          :: ${mcount}
Discord.js     :: v${version}
Node           :: ${process.version}
Platfrom       :: ${os.type}
Uptime         :: ${duration1}
Ping           :: ${fck}ms
Cores          :: ${cpu.cores}
Model          :: ${os.cpus()[0].model} 
Speed          :: ${os.cpus()[0].speed} MHz
      \`\`\``);
         message.reply({embeds: [embed]});
    }
	}