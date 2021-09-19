
const Discord = require(`discord.js`)
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require(`discord.js`)
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
    .setDescription(`Witaj **${guildMember.user.username}!** \n\n Witamy cię na oficjalnym discordzie serwera **AveriaHc.pl** \n Mamy nadzieję, że zostaniesz z nami na dłużej! \n`)
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
    if(command == "clear"){
        let ErrorEmbed = new MessageEmbed()
        .setColor(colors.red)
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/722551354056376472.gif?v=1`)
        .setDescription('**Nie posiadasz permisji ``MANAGE_MESSAGES``**');

        let NoAmountEmbed = new MessageEmbed()
        .setColor(colors.red)
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/722551354056376472.gif?v=1`)
        .setDescription('**Nie podałeś ilości wiadomości do usunięcia!**');

        let NotNumberEmbed = new MessageEmbed()
        .setColor(colors.red)
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/722551354056376472.gif?v=1`)
        .setDescription('**Podaj liczbę!**');

        let WarningEmbed = new MessageEmbed()
        .setColor(colors.red)
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/722551354056376472.gif?v=1`)
        .setDescription('**Liczba wiadomości do usunięcia **nie może** przekraczać ``100`` oraz wiadomości **nie mogą** być starsze niż ``14dni``.**');

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(ErrorEmbed);

        let amount = args[0];
        if(!amount) return message.channel.send(NoAmountEmbed);
        if(isNaN(amount)) return message.channel.send(NotNumberEmbed);
        if(amount > 100 || amount == 0) return message.channel.send(WarningEmbed);

        let SuccesEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Pomyślnie usunięto!`, `https://cdn.discordapp.com/emojis/722551352638570567.gif?v=1`)
        .setDescription(`**Usunięto __` + amount + `__ wiadomości.**`);
message.delete()
        message.channel.bulkDelete(amount, true)
            .then(async deleted => {
               var msg = await message.channel.send(SuccesEmbed)
               
                msg.delete({ timeout: 10000 })
            })
            .catch(err => message.reply(`Błąd: ${err}`));
    }
if(command == "kick"){
    let NoPermEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
        .setDescription('**Nie posiadasz permisji ``KICK_MEMBERS``**');

        let NoUserEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
        .setDescription('**Nie podałeś użytkownika do wyrzucenia!**');

        let AuthorEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
        .setDescription('**Nie możesz wyrzucić samego siebie!**');

        let NotKickableEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
        .setDescription('**Nie możesz wyrzucić tego użytkownika!**');

        let NoReasonEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
        .setDescription('**Podaj powód wyrzucenia!**');

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(NoPermEmbed);

        let user = message.mentions.members.first() || message.guild.members.cache.find(x => x.id === args[0]);
        if(!user) return message.channel.send(NoUserEmbed);
        if(user.id === message.author.id) return message.channel.send(AuthorEmbed);
        if(!user.kickable) return message.channel.send(NotKickableEmbed);
        if(!args[1]) return message.channel.send(NoReasonEmbed);
        let args2 = args.slice(1).join(" ");
        let KickedEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`Wyrzucono pomyślnie`, `https://cdn.discordapp.com/emojis/714573580024938637.gif?v=1`)
        .setDescription(`\`👞\`  Wyrzucony użytkownik: ${user} (${user.id}) \n \`💣\`  Administrator: ${message.author} (${message.author.id}) \n \`📖\`  Powód: ${args2}`);
        message.channel.send(KickedEmbed);

        user.kick(args[1] + ` || przez ${message.author.tag}`);
}
if(command == "ban"){
    let NoPermEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
    .setDescription('**Nie posiadasz permisji``BAN_MEMBERS``**');

    let NoUserEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
    .setDescription('**Nie podałeś użytkownika do zbanowania!**');

    let AuthorEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
    .setDescription('**Nie możesz zbanować samego siebie!**');

    let NotBannableEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
    .setDescription('**Nie możesz zbanować tego użytkownika!**');

    let NoReasonEmbed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(`Błąd`, `https://cdn.discordapp.com/emojis/694447104038273114.gif?v=1`)
    .setDescription('**Podaj powód zbanowania!**');

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(NoPermEmbed);
    let args2 = args.slice(1).join(" ");
    let user = message.mentions.members.first() || message.guild.members.cache.find(x => x.id === args[0]);
    if(!user) return message.channel.send(NoUserEmbed);
    if(user.id === message.author.id) return message.channel.send(AuthorEmbed);
    if(!user.bannable) return message.channel.send(NotBannableEmbed);
    if(!args[1]) return message.channel.send(NoReasonEmbed);

    let BannedEmbed = new MessageEmbed()
    .setColor("RED")
    .setAuthor(`Zbanowano pomyślnie`, `https://cdn.discordapp.com/emojis/714573580024938637.gif?v=1`)
    .setDescription(`\`🔨\`  **Zbanowany użytkownik**: ${user} (${user.id}) \n \`💣\`  **Administrator**: ${message.author} (${message.author.id}) \n \`🔑\`  **Powód**: ${args2}`);
    message.channel.send(BannedEmbed);

    user.ban({
        reason: `${args2} || Wykonano przez: ${message.author.id}`
    });

}
})

client.login(config.token)