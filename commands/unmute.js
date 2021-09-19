const db = require("quick.db");
const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
    commands: `unmute`,
    callback: async (message, args, text, bot) => {

    if (!message.member.permissions.has(`MANAGE_ROLES`)) {
        const error4 = new Discord.MessageEmbed()
        embed
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Nie posiadasz uprawnień!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error4)
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            const error3 = new Discord.MessageEmbed()
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Bot nie ma uprawnien do zarzadzania rolami!`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error3)
        }

    const user = message.mentions.members.first();

    if (!user) {
        const error2 = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Oznacz uzytkownika ktorego chcesz odciszyc!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(error2)
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Wyciszony/a");

    if (user.roles.cache.has(muterole)) {
        const error1 = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Ten uzytkownik nawet nie jest wyciszony!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(error1)

    user.roles.remove(muterole)

    const embed = new Discord.MessageEmbed()
    .setTitle(`UNMUTE!`)
    .setColor(`RED`)
    .setDescription(`Odciszono: ${message.mentions.users.first().username}!\nPrzez: ${message.author.tag} (${message.author.id})`)
    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)

    const embedpv = new Discord.MessageEmbed()
    .setTitle(`UNMUTE!`)
    .setColor(`RED`)
    .setDescription(`Przez: ${message.author.tag} (${message.author.id})\nn**Serwer:**\`${message.guild}\``)
    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
    user.send(embedpv)
    
    message.delete()
    }
  }
};