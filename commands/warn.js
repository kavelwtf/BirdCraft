
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
  commands: "warn",
  callback: async (message, args, text, bot, client) => {

    if (!message.member.permissions.has(`BAN_MEMBERS`)) {
        const error4 = new Discord.MessageEmbed()
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Nie posiadasz uprawnień! \`(BAN_MEMBERS)\``)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error4).then(msg => msg.delete({timeout: 15000}));
    }
    else {

    const user = message.mentions.members.first();

    if (!user) {
        const error3 = new Discord.MessageEmbed()
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Oznacz uzytkownika ktorego chcesz zwarnowac!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error3).then(msg => msg.delete({timeout: 15000}));
    }
    else {

    if (message.mentions.users.first().bot) {
        const error2 = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Nie mozesz zwarnowac bota!!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error2).then(msg => msg.delete({timeout: 15000}));
    }
    else {

    let reason = args.slice(1).join("");

    if (!reason) {
        const error5 = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Podaj powod!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error5).then(msg => msg.delete({timeout: 15000}));
    }
    else {

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      const embedpv = new Discord.MessageEmbed()
      .setTitle(`WARN!`)
      .setColor(`RED`)
      .setDescription(`Zostales zwarnowany\nPrzez: ${message.author.tag} (${message.author.id})\nSerwer: ${message.guild.name}!`)
      .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        user.send(embedpv)
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      const embedpv = new Discord.MessageEmbed()
      .setTitle(`WARN!`)
      .setColor(`RED`)
      .setDescription(`Zostales zwarnowany\nPrzez: ${message.author.tag} (${message.author.id})\nSerwer: ${message.guild.name}\nPowod: {reason}!`)
      .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        user.send(embedpv)
      
      message.delete
      
    }
    }
  }
}
    }
  }
};