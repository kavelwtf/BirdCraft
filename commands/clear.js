
const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
    commands: `clear`,
    callback: async (message, args, text, bot) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            const embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        }
        else {
            if (!(args[0])) {
                const embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Błąd!`)
                    .setColor(`RED`)
                    .setDescription(`Musisz podać ilość!`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
            }
            else {
                if (Number.isNaN(+args[0])) {
                    const embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Błąd!`)
                        .setColor(`RED`)
                        .setDescription(`Podana ilość jest nieprawidłowa!`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
                }
                else {
                        const embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Sukces!`)
                            .setColor(`RED`)
                            .setDescription(`> Administrator ${message.author} usunął ${args[0]} wiadomości!`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.bulkDelete(args[0]).then(() => {
                            const embed = new Discord.MessageEmbed()
                            embed
                                .setTitle(`Sukces!`)
                                .setColor(`RED`)
                                .setDescription(`> Administrator ${message.author} usunął ${args[0]} wiadomości!`)
                                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
                            return
                        });
                    }
                }
            }
        }
    }