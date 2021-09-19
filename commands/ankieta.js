const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)


module.exports = {
    commands: `ankieta`,
    callback: async (message, args) => {
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

                const desc = args.join(" ").split("|");

                let ankieta = new Discord.MessageEmbed()
                .setTitle('ANKIETA')
                .setColor(`RED`)
                .setDescription(desc)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                
                const msg = await message.channel.send(ankieta);

                const yesEmoji = message.guild.emojis.cache.find(e => e.name === 'tak');
                const noEmoji = message.guild.emojis.cache.find(e => e.name === 'nie');
                const mehEmoji = message.guild.emojis.cache.find(e => e.name === 'meh');

                msg.react(yesEmoji);
                msg.react(mehEmoji);
                msg.react(noEmoji);
        }
        message.delete();
    }
}