 const Discord = require('discord.js')
 const config = require('../config.json')
 const chalk = require("chalk")
 const { prefix } = require('../config.json')

 const validatePermissions = (permissions) => {
   const validPermissions = [
     'CREATE_INSTANT_INVITE',
     'KICK_MEMBERS',
     'BAN_MEMBERS',
     'ADMINISTRATOR',
     'MANAGE_CHANNELS',
     'MANAGE_GUILD',
     'ADD_REACTIONS',
     'VIEW_AUDIT_LOG',
     'PRIORITY_SPEAKER',
     'STREAM',
     'VIEW_CHANNEL',
     'SEND_MESSAGES',
     'SEND_TTS_MESSAGES',
     'MANAGE_MESSAGES',
     'EMBED_LINKS',
     'ATTACH_FILES',
     'READ_MESSAGE_HISTORY',
     'MENTION_EVERYONE',
     'USE_EXTERNAL_EMOJIS',
     'VIEW_GUILD_INSIGHTS',
     'CONNECT',
     'SPEAK',
     'MUTE_MEMBERS',
     'DEAFEN_MEMBERS',
     'MOVE_MEMBERS',
     'USE_VAD',
     'CHANGE_NICKNAME',
     'MANAGE_NICKNAMES',
     'MANAGE_ROLES',
     'MANAGE_WEBHOOKS',
     'MANAGE_EMOJIS',
   ]
 
   for (const permission of permissions) {//polecam forEach
     if (!validPermissions.includes(permission)) {
       throw new Error(`Unknown permission node "${permission}"`)
     }
   }
 }
 let recentlyRan = []
 module.exports = (client, commandOptions) => {
 
   let {
     commands,
     expectedArgs = '',
     permissionError = 'Nie posiadasz uprawnień!',
     minArgs = 0,
     maxArgs = null,
     cooldown = 3, 
     permissions = [],
     requiredRoles = [],
     callback,
   } = commandOptions
 
   if (typeof commands === 'string') {
     commands = [commands]
   }
 
   console.log(chalk.green(`✅ | Komenda ${config.prefix}${commands[0]} działa poprawnie!`))
 
   if (permissions.length) {
     if (typeof permissions === 'string') {
       permissions = [permissions]
     }
 
     validatePermissions(permissions)
   }
 
   client.on('message', async (message) => {
 
     if (message.channel.type === 'dm' || message.author.bot) return;
     const { member, content, guild } = message
     const embed = new Discord.MessageEmbed();
     for (const alias of commands) {
       const command = `${prefix}${alias.toLowerCase()}`
       if (
         content.toLowerCase().startsWith(`${command} `) ||
         content.toLowerCase() === command
       ) {
 
 
         for (const permission of permissions) {
           if (!member.hasPermission(permission)) {
             message.reply(permissionError)
             return
           }
         }
 
         for (const requiredRole of requiredRoles) {
           const role = guild.roles.cache.find(
             (role) => role.name === requiredRole
           )
 
           if (!role || !member.roles.cache.has(role.id)) {
             message.reply(
               `Musisz posiadać rolę "${requiredRole}" aby używać tej komendy!`
             )
             return
           }
         }
         let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
         if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
           embed
             .setTitle(`ERROR!`)
             .setColor(`RED`)
             .setDescription(`Musisz odczekać przed ponownym użyciem tej komendy!`)
             .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
           return message.channel.send(embed).then(msg => msg.delete({timeout: 15000}));
         }
 
 
 
         const args = content.split(/[ ]+/)
          //k
         args.shift()
 
         if (
           args.length < minArgs ||
           (maxArgs !== null && args.length > maxArgs)
         ) {
           message.reply(
             `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
           )
           return
         }
         if (cooldown > 0) {
           recentlyRan.push(cooldownString)
 
           setTimeout(() => {
 
             recentlyRan = recentlyRan.filter((string) => {
               return string !== cooldownString
             })
 
           }, 1000 * cooldown)
         }
         callback(message, args, args.join(' '), client)
         return
 
       }
     }
   })
 }