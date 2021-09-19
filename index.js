
const Discord = require(`discord.js`)
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require(`discord.js`)
const db = require("quick.db");
var prefix = `!`
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const colors = require("./colors.json");
const config = require(`./config.json`)
const package = require(`./package-lock.json`)
const chalk = require(`chalk`)
const fs = require(`fs`)
const path = require(`path`)


client.on("ready", () => {
    //Podczas Logowania do Discorda
    console.log("Zostales zalogowany do averiaBot");
    //Ustawianie statusu
    client.user.setActivity("https://www.BirdCraft.pl/", {
        type: "WATCHING"
      });
    });

client.on("guildMemberAdd", guildMember =>{
    const channel = guildMember.guild.channels.cache.get('888715538967167016');
    
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Witaj **${guildMember.user.username}!** \n\n Witamy cię na oficjalnym discordzie serwera **BirdCraft.pl** \n Mamy nadzieję, że zostaniesz z nami na dłużej! \n`)
    .setThumbnail("https://imgur.com/gallery/TbDQEKQ")
    .setFooter(`BirdCraft.pl`)
    
    channel.send(embed);
    });

client.on("message",  message => {
   if(message.channel.id === '888808271715123240') {
        //message.react(`✅`);
        //message.react('❌');
        const yesEmoji = message.guild.emojis.cache.find(e => e.name === 'tak');
        const noEmoji = message.guild.emojis.cache.find(e => e.name === 'nie');
        const mehEmoji = message.guild.emojis.cache.find(e => e.name === 'meh');

        message.react(yesEmoji);
        message.react(mehEmoji);
        message.react(noEmoji);
    }
});

const baseFile = 'command-base.js'
const commandBase = require(`./commands/${baseFile}`)

const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file))
            commandBase(client, option)
        }
    }
}
readCommands('commands')

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.channel.type === "dm") return;
    //Zwykła tabela argumentów
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
  //Argument długi
    let argument = args.slice(2).join(" ");
    //Sreperowana komenda
    const command = args.shift().toLowerCase();
});

client.login(config.token)