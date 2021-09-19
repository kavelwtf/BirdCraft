const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
    commands: `ban`,
    callback: async (message, args, text, bot) => {

        if (!message.member.permissions.has(`BAN_MEMBERS`)) {
            const embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        }
        else {
            if (!(message.mentions.members.first())) {
                const embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Błąd!`)
                    .setColor(`RED`)
                    .setDescription(`Musisz oznaczyć osobę!`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
            }
            else {
                if (!(args[1])) {
                    const embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Błąd!`)
                        .setColor(`RED`)
                        .setDescription(`Musisz podać powód!`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
                }
                else {
                    message.mentions.members.first().ban({ reason: `Administrator: ${message.author.tag}` }).then((member) => {
                        const embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Zbanowano użytkownika!`)
                            .setColor(`RED`)
                            .setDescription(`> Administrator: **${message.author}**\n\n> <:ludzie:842313152582516776> Osoba: **${message.mentions.members.first()}**\n\n> <a:discord:842312315599585321> Powód: **${args.splice(1).join(` `)}**\n\n> <:linki:842307249237786656> Serwer: **${message.guild.name}**`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
                        message.mentions.users.first().send(embed).catch(() => { return })
                    }).catch(() => {
                        const embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Błąd!`)
                            .setColor(`RED`)
                            .setDescription(`Bot nie posiada uprawnień!`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
                    });
                }
            }
        }
    }
}