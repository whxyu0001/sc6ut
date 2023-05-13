const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const simplydjs = require("simply-djs");
module.exports = {
    name: "calculator",
    category: "Utility",
    description: "Simply just a calculator",
    aliases: [ "calc" ],
    args: false,
    usage: "",
    permission: [],
    voteonly: false,
    owner: false,
    execute: async (message, args, client, prefix) => {
    simplydjs.calculator(message, {
      embedColor: "WHITE",
      credit: false
    });
  }
}