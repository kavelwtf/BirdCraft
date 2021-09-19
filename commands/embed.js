const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)


module.exports = {
    commands: `embed`,
    callback: async (message, args) => {
        const text = args.join(" ").split("|");
        const title = text[0]
        const desc = text[1]

        if (!message.member.permissions.has(`ADMINISTRATOR`)) {
            const embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        }
        else {
        if (!title) {
            const embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Podaj tytuł swojego embeda!\n\n**Przyklad:** \`!embed TYTUL|TRESC\``)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));

        }

        else {
            if (!desc) {
                const embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Błąd!`)
                    .setColor(`RED`)
                    .setDescription(`Podaj treść swojego embeda!`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
            } 

            else {
                let ankieta = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setColor(`RED`)
                    .setDescription(desc)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(ankieta)
            }
            message.delete();
        }
    }
}
}
