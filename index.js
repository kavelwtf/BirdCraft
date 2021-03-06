
const Discord = require(`discord.js`)
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require(`discord.js`)
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require(`./config.json`)
const package = require(`./package-lock.json`)
const chalk = require(`chalk`)
const fs = require(`fs`)
const path = require(`path`)


client.on("ready", () => {
    //Podczas Logowania do Discorda
    console.log("Bot zostal poprawnie uruchomiony");
    //Ustawianie statusu
    client.user.setStatus('idle')
    client.user.setActivity("https://www.BirdCraft.pl/", {
        type: "STREAMING"
      });
    });

client.on("guildMemberAdd", member =>{
    const channel = member.guild.channels.cache.get('888715538967167016');
    
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`**Witaj** \`${member.user.username}\` **na discordzie** \`BirdCraft.pl\` \n**Mamy nadzieję, że zostaniesz z nami na dłużej!** \n\n**» Przeczytaj regulamin ( <#888705896023220355> )**\n**» Zobacz nowosci na serwerze ( <#888747597056081930> )**\n\n**» Potrzebujesz pomocy? zobacz ( <#888808078902951997> )**`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Jesteś naszym ${member.guild.memberCount} użytkownikiem!`, client.user.displayAvatarURL({ dynamic: true }))
    
    
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
