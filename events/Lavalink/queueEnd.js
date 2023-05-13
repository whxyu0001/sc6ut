const delay = require("delay");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ms = require('ms');
const i18n = require("../../utils/i18n");

module.exports = async (client, player) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;

  const tmkc = new MessageActionRow() 
    
.addComponents(
  
new MessageButton()
  
  .setLabel("Vote Me")   
  
 .setStyle("LINK")  
   .setURL(`https://top.gg/bot/${client.user.id}/vote`), 
            ) 
  
	let thing = new MessageEmbed()
		.setColor(client.embedColor)
		.setDescription(`<:wtfisthiscalled:1106942501446746162> | Queue has been ended. Add more songs to keep the party going`)
		.setAuthor({name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()});
	channel.send({embeds: [thing], components: [tmkc]});
}