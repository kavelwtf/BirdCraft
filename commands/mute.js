const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
    commands: `mute`,
    callback: async (message, args, text, bot, client) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        const error4 = new Discord.MessageEmbed()
        error4
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Nie posiadasz uprawnień!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error4).then(msg => msg.delete({timeout: 15000}));
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        const error3 = new Discord.MessageEmbed()
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Bot nie ma uprawnien do mutowania (MANAGE_ROLES)!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error3).then(msg => msg.delete({timeout: 15000}));
    }

    const user = message.mentions.members.first();

    if (!user) {
        const error2 = new Discord.MessageEmbed()
            .setTitle(`Błąd!`)
            .setColor(`RED`)
            .setDescription(`Oznacz uzytkownika ktorego chcesz zmutowac!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(error2).then(msg => msg.delete({timeout: 15000}));
    }
    if (user.id === message.author.id) {
        const error1 = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Oznacz uzytkownika ktorego chcesz zmutowac!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error1).then(msg => msg.delete({timeout: 15000}));
    }
    let reason = args.slice(1).join("");

    if (!reason) {
        const error = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Podaj powod!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error).then(msg => msg.delete({timeout: 15000}));
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "Wyciszony/a");

    if (!muterole) {
        const blad = new Discord.MessageEmbed()
        .setTitle(`Błąd!`)
        .setColor(`RED`)
        .setDescription(`Stworz role Wyciszony/a i zabierz wszystkie uprawnienia i daj najwyzej zeby mute poprawnie dzialal!`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(blad).then(msg => msg.delete({timeout: 15000}));
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

        const mute = new Discord.MessageEmbed()
        .setTitle(`Sukces!`)
        .setColor(`RED`)
        .setDescription(`> Wyciszony: ${message.mentions.users.first().username}\nPowod: ${reason}`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(error1).then(msg => msg.delete({timeout: 15000}));

    user.send(`**ZOSTALES WYCISZONY**\n\n**Przez:** \`${message.author.tag} (${message.author.id})\`\n**Serwer:**\`${message.guild}\`\n**Powod:** \`${reason}\``)
  }
};