const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)

module.exports = {
    commands: `help`,
    callback: async (message, args, text) => {
        const ilosc = fs.readdirSync("commands").length
        const lista = fs.readdirSync("commands").join(`, `).replace(/\.js/gi, "")
        if (!message.member.permissions.has(`MANAGE_MESSAGES`)) {
            const embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Błąd!`)
                .setColor(`RED`)
                .setDescription(`Nie posiadasz uprawnień!`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        }
        else {
        const embed = new Discord.MessageEmbed()
        embed
            .setTitle(`Oto moje komendy drogi ${message.author.tag}! \n`)
            .setColor(`RED`)
            .setDescription(`**Komendy** \`(${ilosc})\` \n**${lista}**.`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
        }
    }
}
