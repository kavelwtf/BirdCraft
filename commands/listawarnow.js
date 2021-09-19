const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    commands: "listawarnow",
    callback: async (message, args, text, bot, client) => {

    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    const embed = new Discord.MessageEmbed()
    embed
        .setTitle(`LISTA WARNOW!`)
        .setColor(`RED`)
        .setDescription(`> **Uzytkownik** **${user}** **posiada ${warnings} warnow!**`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
  }
};