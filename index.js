const Discord = require('discord.js')
const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_BANS, 
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
]});

require('dotenv').config();

let prefix = process.env.PREFIX;

const invites = {};

const wait = require('util').promisify(setTimeout);


client.on('ready',() => {

  wait(1000);

  client.guilds.cache.forEach(g => {
    g.invites.fetch().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });

    console.log(`Bot started ${client.user.username}`);
    console.log(`Prefix: ${prefix}`)

    client.user.setPresence({ activities: [{ name: '🚀 Едет на отбитие точки' }], status: 'dnd'});
  });

  client.on('guildMemberAdd', member => {
    
    member.guild.invites.fetch().then(guildInvites => {
      
      const ei = invites[member.guild.id];
      
      invites[member.guild.id] = guildInvites;
      
      const invite = guildInvites.find(i => !ei.get(i.code) || ei.get(i.code).uses < i.uses);
      
      const inviter = client.users.cache.get(invite.inviter.id);
   
      const logChannel = member.guild.channels.cache.find(channel => channel.name === "invites");
      
      const inviterr = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setAuthor(`${member.user.tag}`, `${member.user.avatarURL()}`)
        .setTitle(`Подключился`)
        .setDescription(`Пригласил: ${inviter.tag} Код: ${invite.code}`);

      logChannel.send({ embeds: [inviterr] });

    });
  });

client.on('messageUpdate', async (oldMessage, newMessage) => {
  require('./events/MessageUpdate')(oldMessage,newMessage);
});

client.on('messageDelete', async (member,message) => {
  require('./events/MessageDelete')(member,message);
});


client.on('messageCreate', message => {
    if (message.content === 'ping') {
      message.channel.send('pong');
    };
    if (message.content === `${prefix}ping`) {  
      message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    };
});

client.login(process.env.DISCORD_TOKEN);
