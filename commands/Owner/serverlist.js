const { MessageEmbed, MessageButton, MessageActionRow } = require ('discord.js')
const load = require("lodash");

module.exports = {
    name: "serverlist",
    category: "Owner",
    description: "Listing Of Servers",
    aliases: ["sl"],
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        const serverlist = client.guilds.cache.map((guild, i) => `\`\`\`Server Name: "${guild.name}"\nGuild ID: "${guild.id}"\nMember Count: "${guild.memberCount}"\`\`\``);
        const mapping = load.chunk(serverlist, 10);
        const pages = mapping.map((s) => s.join("\n"));
        let page = 0;

        if (client.guilds.cache.size <= 10) {

            const embed = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(pages[page])
            .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                }),
            })
            .setTitle(`${message.client.user.username}'s Server List`);
            return await message.channel.send({
                embeds: [embed]
            });
    
        } else {

        const embed2 = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(pages[page])
            .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                }),
            })
            .setTitle(`${message.client.user.username} Server List`);

        const but1 = new MessageButton().setCustomId("server_list_next").setEmoji("<:s_next:1099632499770011668>").setStyle(ButtonStyle.Primary);

        const but2 = new ButtonBuilder().setCustomId("server_list_previous").setEmoji("<:s_prev:1099632613993500682>").setStyle(ButtonStyle.Primary);

        const but3 = new MessageButton().setCustomId("server_list_stop").setEmoji("<:stop:1106940808172666960>").setStyle(ButtonStyle.Danger);

        const disbut = new MessageButton().setDisabled(true).setCustomId("disabled").setEmoji("<:s_next:1099632499770011668>").setStyle(ButtonStyle.Primary);

        const disbut1 = new MessageButton().setDisabled(true).setCustomId("disabled1").setEmoji("<:s_prev:1099632613993500682>").setStyle(ButtonStyle.Primary);

        const disbut2 = new MessageButton().setDisabled(true).setCustomId("disabled2").setEmoji("<:stop:1106940808172666960>").setStyle(ButtonStyle.Danger);

        const row1 = new ActionRowBuilder().addComponents([but2, but3, but1]);

        const msg = await message.channel.send({
            embeds: [embed2],
            components: [row1],
        });

        const collector = message.channel.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id === message.author.id) return true;
                else {
                    b.reply({
                        ephemeral: true,
                        content: `<:s_cross:1093541595334324326> | Only My Developer's Can Use This Command.`,
                    });
                    return false;
                }
            },
            time: 60000 * 5,
            idle: 60000 * 2
        });

        collector.on("collect", async (button) => {
            if (button.customId === "server_list_next") {
                await button.deferUpdate().catch(() => {});
                page = page + 1 < pages.length ? ++page : 0;

                const embed3 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(pages[page])
                    .setFooter({
                        text: `Page ${page + 1}/${pages.length}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setTitle(`${message.client.user.username}'s Server List`);

                await msg.edit({
                    embeds: [embed3],
                    components: [row1],
                });
            } else if (button.customId === "server_list_previous") {
                await button.deferUpdate().catch(() => {});
                page = page > 0 ? --page : pages.length - 1;

                const embed4 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(pages[page])
                    .setFooter({
                        text: `Page ${page + 1}/${pages.length}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setTitle(`${message.client.user.username}'s Server List`);

                await msg
                    .edit({
                        embeds: [embed4],
                        components: [row1],
                    })
                    .catch(() => {});
            } else if (button.customId === "server_list_stop") {
                await button.deferUpdate().catch(() => {});
                collector.stop();
            } else return;
        });

        collector.on("end", async () => {
            await msg.edit({
                components: [
                    new ActionRowBuilder().addComponents([disbut1, disbut2, disbut]),
                  ],
            });
        });
        }
    },
};
